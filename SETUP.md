# Instrucciones de Setup - PhoneAlivia

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto Creada

### ✅ Configuración Base
- Next.js 14+ con App Router
- TypeScript configurado
- Tailwind CSS con colores y animaciones personalizadas
- Configuración para Vercel

### ✅ Componentes Core
- `BodyMap.tsx` - Mapa corporal interactivo (mobile-optimized)
- `FacesPainScale.tsx` - Escala Wong-Baker FACES
- `MedicationWheel.tsx` - Rueda de medicamentos
- `HealthAssistance.tsx` - Asistencia de salud
- `Layout.tsx` - Layout principal con navegación
- `MobileNav.tsx` - Navegación inferior para móvil

### ✅ Páginas Principales
- `/login` - Página de login
- `/register` - Página de registro
- `/dashboard` - Dashboard del paciente
- `/daily-record/location` - Primer paso del wizard
- `/daily-record/intensity` - Segundo paso del wizard
- `/medications` - Gestión de medicamentos (básica)
- `/history` - Historial (básica)

### ✅ Hooks y Utilidades
- `useAuth.tsx` - Hook de autenticación
- `useAliviaAlerts.tsx` - Hook de alertas
- `apiMock.ts` - API mock completa
- `mockData.ts` - Datos mock

### ✅ Contextos
- `DailyRecordContext.tsx` - Context para wizard de registro diario

## Próximos Pasos

### Páginas del Wizard Faltantes
- [ ] `/daily-record/quality` - Cualidad del dolor
- [ ] `/daily-record/duration` - Duración
- [ ] `/daily-record/functional-impact` - Impacto funcional
- [ ] `/daily-record/emotional-state` - Estado emocional
- [ ] `/daily-record/medication` - Medicación
- [ ] `/daily-record/recommendation` - Recomendación
- [ ] `/daily-record/save` - Guardar registro

### Mejoras Pendientes
- [ ] Completar página de medicamentos con funcionalidad completa
- [ ] Completar página de historial con gráficos
- [ ] Agregar todas las animaciones del proyecto original
- [ ] Testing en dispositivos móviles reales
- [ ] Optimizaciones PWA

## Características Mobile-First

✅ Navegación bottom bar para móvil  
✅ Touch-friendly (áreas mínimas 44x44px)  
✅ Diseño responsive (móvil primero, luego tablet/desktop)  
✅ Optimización de imágenes  
✅ Viewport configurado  
✅ Safe area support  

## Deployment en Vercel

1. Conecta tu repositorio GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. El deployment se hará automáticamente

No se requieren variables de entorno para el modo mock (por defecto).

## Modo Mock

Por defecto, la aplicación funciona completamente con datos mock. Esto permite:
- Desarrollo sin backend
- Testing completo offline
- Demo funcional

Para conectar con backend real, crear `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK=false
```

