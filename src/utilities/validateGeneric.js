/**
 * Valida un objeto de forma genérica según el tipo de cada valor.
 * - Sin reglas específicas por campo.
 * - Detección automática de tipo y validación acorde.
 * - Devuelve un arreglo con los mensajes de error encontrados.
 */
export const validateGeneric = (obj = {}) => {
  const errors = [];

  for (const [key, value] of Object.entries(obj)) {
    const trimmedKey = key.trim();
    const trimmedValue = typeof value === "string" ? value.trim() : value;

    // 1️⃣ Campos vacíos o nulos
    if (
      trimmedValue === undefined ||
      trimmedValue === null ||
      (typeof trimmedValue === "string" && trimmedValue === "") ||
      (Array.isArray(trimmedValue) && trimmedValue.length === 0)
    ) {
      errors.push(`El campo "${trimmedKey}" es obligatorio.`);
      continue;
    }

    // 2️⃣ Detección automática por tipo de valor
    switch (typeof trimmedValue) {
      case "string":
        // Email detectado automáticamente por formato
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          continue; // válido, no error
        }
        // Teléfono detectado por patrón
        if (/^\+?\d{8,15}$/.test(trimmedValue)) {
          continue; // válido
        }
        // Texto muy corto
        if (trimmedValue.length < 2) {
          errors.push(`El campo "${trimmedKey}" debe tener al menos 2 caracteres.`);
        }
        break;

      case "number":
        if (isNaN(trimmedValue)) {
          errors.push(`El campo "${trimmedKey}" debe ser un número válido.`);
        }
        break;

      case "boolean":
        // nada que validar aquí, pero podrías forzar true/false si quisieras
        break;

      case "object":
        if (Array.isArray(trimmedValue) && trimmedValue.length === 0) {
          errors.push(`El campo "${trimmedKey}" no puede estar vacío.`);
        }
        break;

      default:
        errors.push(`El tipo de dato de "${trimmedKey}" no es válido.`);
    }
  }

  return errors;
};
