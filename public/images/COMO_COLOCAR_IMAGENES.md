# 📸 Cómo Colocar las Imágenes del Cuerpo Humano

## Paso 1: Guardar las Imágenes

Tienes 3 imágenes del cuerpo humano que debes guardar en esta carpeta con estos nombres específicos:

### Vista Frontal (de frente)
- **Nombre del archivo:** `body-frontal.png` o `body-frontal.jpg`
- **Descripción:** Imagen frontal del cuerpo humano mostrando el sistema muscular de frente

### Vista Posterior (de atrás)
- **Nombre del archivo:** `body-posterior.png` o `body-posterior.jpg`
- **Descripción:** Imagen del cuerpo humano mostrando el sistema muscular desde atrás

### Vista Lateral (de lado)
- **Nombre del archivo:** `body-lateral.png` o `body-lateral.jpg`
- **Descripción:** Imagen del cuerpo humano mostrando el sistema muscular de perfil

## Paso 2: Ubicación de los Archivos

Las imágenes deben estar exactamente en esta ubicación:

```
phonealivia/
└── public/
    └── images/
        ├── body-frontal.png    (o .jpg)
        ├── body-posterior.png  (o .jpg)
        └── body-lateral.png    (o .jpg)
```

## Paso 3: Formato Recomendado

- **Formato:** PNG (preferido) o JPG
- **Fondo:** Blanco (como las imágenes que proporcionaste)
- **Orientación:** Vertical (altura mayor que ancho)
- **Calidad:** Alta resolución para mejor visualización

## Paso 4: Verificar

Una vez colocadas las imágenes, al ejecutar la aplicación deberías ver:
- ✅ Las imágenes cargándose correctamente
- ✅ Sin mensajes de "Cargando imagen..."
- ✅ Las áreas del cuerpo interactivas funcionando

## Notas Importantes

- Los nombres de los archivos deben ser **exactamente** como se muestran arriba (en minúsculas)
- El componente buscará primero archivos `.png`, luego `.jpg`
- Si las imágenes tienen otros nombres, el componente no las encontrará

## Solución de Problemas

Si las imágenes no se muestran:
1. Verifica que los nombres de archivo sean exactos (sin espacios, en minúsculas)
2. Asegúrate de que estén en `public/images/`
3. Reinicia el servidor de desarrollo (`npm run dev`)
4. Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

