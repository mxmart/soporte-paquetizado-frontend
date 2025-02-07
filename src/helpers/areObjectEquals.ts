export function areObjectsEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    // Si son el mismo objeto (por referencia), son iguales
    if (obj1 === obj2) return true;
  
    // Si alguno no es un objeto o es null, no son iguales
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
      return false;
    }
  
    // Obtener las claves de ambos objetos
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    // Si tienen diferente cantidad de claves, no son iguales
    if (keys1.length !== keys2.length) return false;
  
    // Verificar cada clave y valor
    for (const key of keys1) {
      if (!keys2.includes(key)) return false; // Si falta una clave, no son iguales
  
      const value1 = obj1[key];
      const value2 = obj2[key];
  
      // Si los valores son objetos o arreglos, comparar recursivamente
      const areObjects = typeof value1 === "object" && value1 !== null;
      if (areObjects) {
        if (!areObjectsEqual(value1, value2)) return false;
      } else {
        // Comparar valores primitivos
        if (value1 !== value2) return false;
      }
    }
  
    return true;
  };
  