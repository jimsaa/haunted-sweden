/** Approximate distance in meters between two WGS84 coordinates. */
export function distanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** True when every pair of places is within `maxMeters`. */
export function placesWithinMeters(
  places: { latitude: number | null; longitude: number | null }[],
  maxMeters: number
): boolean {
  const coords = places.filter(
    (p): p is { latitude: number; longitude: number } =>
      p.latitude != null && p.longitude != null
  );
  if (coords.length < 2) return false;
  let maxDist = 0;
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const d = distanceMeters(
        coords[i].latitude,
        coords[i].longitude,
        coords[j].latitude,
        coords[j].longitude
      );
      maxDist = Math.max(maxDist, d);
    }
  }
  return maxDist <= maxMeters;
}
