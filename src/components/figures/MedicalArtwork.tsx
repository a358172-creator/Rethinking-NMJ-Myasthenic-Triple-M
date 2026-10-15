import { medicalArtwork, medicalArtworkUrl } from '../../data/medicalArtwork';
import type { MedicalArtworkId } from '../../data/medicalArtwork';
import './medical-artwork.css';

interface Props {
  illustration: MedicalArtworkId;
  alt?: string;
  className?: string;
  eager?: boolean;
}

/** A real project-owned raster asset, with captions/controls kept in accessible HTML. */
export function MedicalArtwork({ illustration, alt, className = '', eager = false }: Props) {
  const artwork = medicalArtwork[illustration];
  return <img className={`medical-artwork ${className}`} src={medicalArtworkUrl(illustration)}
    alt={alt ?? artwork.alt} width={artwork.width} height={artwork.height}
    loading={eager ? 'eager' : 'lazy'} decoding="async" data-medical-artwork={illustration} />;
}
