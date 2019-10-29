export function updatePosition(coords) {
  return {
    type: 'UPDATE_POSITION',
    payload: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  };
}
