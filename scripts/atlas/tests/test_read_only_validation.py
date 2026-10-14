"""Full-study revalidation must preserve previous private research artifacts."""
from pathlib import Path
import hashlib
import json
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from process_workbook import DEFAULT_WORKBOOK, REPOSITORY, check_only  # noqa: E402


@unittest.skipUnless(DEFAULT_WORKBOOK.exists(), "Authoritative workbook not available")
class ReadOnlyFullValidationTests(unittest.TestCase):
    def test_actual_full_checks_fail_without_rewriting_old_patient_artifacts(self):
        source_before = hashlib.sha256(DEFAULT_WORKBOOK.read_bytes()).hexdigest()
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            old = {name: b"existing private artifact fixture" for name in (
                "atlas.review.json", "atlas.provenance.private.json", "validation.audit.private.json")}
            for name, content in old.items():
                (output / name).write_bytes(content)
            audit = output / "core_atlas/full_study_validation.private.json"
            success = SimpleNamespace(returncode=0, stdout="")
            with patch("process_workbook.OUTPUT_DIRECTORY", output), patch("process_workbook.CHECK_ONLY_AUDIT", audit), patch("process_workbook.subprocess.run", return_value=success):
                passed, checks = check_only(DEFAULT_WORKBOOK, output / "aggregate-report.md")
            self.assertFalse(passed)
            self.assertEqual(len(checks), 48)
            self.assertEqual(sum(check.passed for check in checks), 44)
            self.assertTrue(all(check.name.startswith("Troponin ") or check.name == "Supported quantitative peak troponin n" for check in checks if not check.passed))
            for name, content in old.items():
                self.assertEqual((output / name).read_bytes(), content)
            payload = json.loads(audit.read_text())
            self.assertFalse(payload["validationPassed"])
            self.assertFalse(payload["patientExportGenerated"])
            self.assertNotIn("records", payload)
            self.assertNotIn("troponinAdjudications", payload)
            self.assertEqual(hashlib.sha256(DEFAULT_WORKBOOK.read_bytes()).hexdigest(), source_before)

    def test_read_only_report_cannot_overwrite_research_input(self):
        before = DEFAULT_WORKBOOK.read_bytes()
        with self.assertRaises(ValueError):
            check_only(DEFAULT_WORKBOOK, DEFAULT_WORKBOOK)
        self.assertEqual(DEFAULT_WORKBOOK.read_bytes(), before)

    def test_historical_full_report_is_preserved(self):
        report = REPOSITORY / "DATA_VALIDATION_REPORT.md"
        before = report.read_bytes()
        with self.assertRaises(ValueError):
            check_only(DEFAULT_WORKBOOK, report)
        self.assertEqual(report.read_bytes(), before)

    def test_custom_input_cannot_be_its_own_report_or_audit_destination(self):
        with tempfile.TemporaryDirectory() as directory:
            workbook = Path(directory) / "input.xlsx"
            original = b"source fixture; guard must run before ingestion"
            workbook.write_bytes(original)
            with self.assertRaisesRegex(ValueError, "cannot overwrite their workbook input"):
                check_only(workbook, workbook)
            self.assertEqual(workbook.read_bytes(), original)
            with patch("process_workbook.CHECK_ONLY_AUDIT", workbook):
                with self.assertRaisesRegex(ValueError, "cannot overwrite their workbook input"):
                    check_only(workbook, Path(directory) / "report.md")
            self.assertEqual(workbook.read_bytes(), original)


if __name__ == "__main__":
    unittest.main()
