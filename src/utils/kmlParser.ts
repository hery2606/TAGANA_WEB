import xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';

export interface KMLCoordinate {
  lat: number;
  lng: number;
}

export interface KMLPlacemark {
  name: string;
  coordinates: KMLCoordinate[][];
  type: 'LineString' | 'Polygon' | 'Point';
}

export async function parseKMLFile(filePath: string): Promise<KMLPlacemark[]> {
  const kmlContent = fs.readFileSync(filePath, 'utf-8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(kmlContent);
  
  const placemarks: KMLPlacemark[] = [];
  const kmlPlacemarks = result.kml.Document[0].Placemark || [];
  
  for (const placemark of kmlPlacemarks) {
    const name = placemark.name?.[0] || 'Unnamed';
    
    // Parse LineString
    if (placemark.LineString) {
      const coordsText = placemark.LineString[0].coordinates[0].trim();
      const coordinates = parseCoordinateString(coordsText);
      placemarks.push({
        name,
        coordinates: [coordinates],
        type: 'LineString'
      });
    }
    
    // Parse Polygon
    if (placemark.Polygon) {
      const outerBoundary = placemark.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0].trim();
      const coordinates = parseCoordinateString(outerBoundary);
      placemarks.push({
        name,
        coordinates: [coordinates],
        type: 'Polygon'
      });
    }
    
    // Parse Point
    if (placemark.Point) {
      const coordsText = placemark.Point[0].coordinates[0].trim();
      const coordinates = parseCoordinateString(coordsText);
      placemarks.push({
        name,
        coordinates: [coordinates],
        type: 'Point'
      });
    }
  }
  
  return placemarks;
}

function parseCoordinateString(coordsText: string): KMLCoordinate[] {
  return coordsText
    .split(/\s+/)
    .filter(coord => coord.trim())
    .map(coord => {
      const [lng, lat] = coord.split(',').map(Number);
      return { lat, lng };
    });
}

export function convertKMLCoordinatesToLeaflet(coordinates: KMLCoordinate[]): [number, number][] {
  return coordinates.map(coord => [coord.lat, coord.lng]);
}
