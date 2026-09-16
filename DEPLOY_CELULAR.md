# Cómo publicar Entrenamiento IA V2 en Vercel

## Opción recomendada: GitHub + Vercel

### 1. Crea un repositorio
1. Entra a GitHub y crea un repositorio nuevo, por ejemplo `entrenamiento-ia`.
2. Sube TODOS los archivos de esta carpeta a la raíz del repositorio.
3. No subas ningún archivo que contenga tu clave real de OpenAI.

### 2. Publica en Vercel
1. Crea/inicia sesión en Vercel.
2. Pulsa **Add New → Project**.
3. Conecta GitHub y selecciona el repositorio `entrenamiento-ia`.
4. Vercel debe reconocerlo como proyecto web. No necesitas comando de build para esta versión.
5. Pulsa **Deploy**.

Al terminar obtendrás una URL HTTPS del tipo:
`https://tu-proyecto.vercel.app`

La app ya funcionará en modo local, pero todavía falta activar la IA online.

### 3. Activa la IA real
1. Crea una API key en la plataforma de OpenAI.
2. En Vercel abre tu proyecto → **Settings → Environment Variables**.
3. Añade:
   - Nombre: `OPENAI_API_KEY`
   - Valor: tu clave real
4. Opcional:
   - Nombre: `OPENAI_MODEL`
   - Valor: `gpt-5.6-luna`
5. Guarda.
6. En **Deployments**, vuelve a desplegar (Redeploy) el último deployment.

En la app:
**Ajustes → IA online → Comprobar conexión**
debería mostrar **IA lista**.

## Instalar en iPhone
1. Abre la URL HTTPS en Safari.
2. Pulsa el botón Compartir.
3. Pulsa **Añadir a pantalla de inicio**.
4. Confirma **Añadir**.

## Instalar en Android
1. Abre la URL HTTPS en Chrome.
2. Abre el menú de Chrome.
3. Pulsa **Instalar aplicación** o **Añadir a pantalla de inicio**.
4. Confirma.

## Tus datos
Los entrenamientos y el peso se guardan en `localStorage` del navegador del dispositivo.
- Si borras los datos del navegador, puedes perder el historial.
- Usa **Ajustes → Exportar JSON** periódicamente como copia de seguridad.
- La IA online recibe la pregunta y hasta las últimas 20 sesiones para generar el análisis.
- La API key permanece en Vercel y no se envía al navegador.

## Coste de IA
La API de OpenAI se factura aparte de una suscripción de ChatGPT. La aplicación sigue funcionando sin API key usando el analizador local.
