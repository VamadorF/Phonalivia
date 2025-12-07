# PhoneAlivia - Plataforma Móvil de Manejo de Dolor Crónico

Versión mobile-first de Alivia construida con Next.js 14+ y optimizada para dispositivos móviles y tablets. Compatible con Vercel para deployment.

## Características

- ✅ Diseño mobile-first optimizado para pantallas pequeñas
- ✅ Navegación bottom bar para móviles
- ✅ Todas las animaciones preservadas (Framer Motion)
- ✅ Datos mock para desarrollo sin backend
- ✅ Compatible con Vercel
- ✅ Componentes interactivos: BodyMap, FacesPainScale, MedicationWheel
- ✅ Wizard completo de registro diario (9 pasos)
- ✅ Dashboard con gráficos y estadísticas
- ✅ Gestión completa de medicamentos

## Tecnologías

- Next.js 14+ (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query
- React Icons
- Recharts (gráficos)
- date-fns

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
phonealivia/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Estilos globales
│   │   ├── page.tsx                # Página raíz (redirección)
│   │   ├── login/                  # Página de login
│   │   ├── register/               # Página de registro
│   │   └── (patient)/              # Rutas de paciente (grupo)
│   │       ├── layout.tsx          # Layout de paciente
│   │       ├── dashboard/          # Dashboard
│   │       ├── daily-record/       # Wizard de registro diario
│   │       │   ├── location/       # Paso 1: Localización
│   │       │   ├── intensity/      # Paso 2: Intensidad
│   │       │   ├── quality/        # Paso 3: Cualidad
│   │       │   ├── duration/       # Paso 4: Duración
│   │       │   ├── functional-impact/ # Paso 5: Impacto funcional
│   │       │   ├── emotional-state/   # Paso 6: Estado emocional
│   │       │   ├── medication/        # Paso 7: Medicación
│   │       │   ├── recommendation/    # Paso 8: Recomendación
│   │       │   └── save/              # Paso 9: Guardar
│   │       ├── medications/        # Gestión de medicamentos
│   │       └── history/            # Historial
│   ├── components/                 # Componentes reutilizables
│   │   ├── BodyMap.tsx            # Mapa corporal interactivo
│   │   ├── FacesPainScale.tsx     # Escala Wong-Baker FACES
│   │   ├── MedicationWheel.tsx    # Rueda de medicamentos
│   │   ├── HealthAssistance.tsx   # Asistencia de salud
│   │   ├── Layout.tsx             # Layout principal
│   │   ├── MobileNav.tsx          # Navegación móvil
│   │   └── ClientProviders.tsx    # Providers de React Query y Auth
│   ├── context/                    # Contextos
│   │   └── DailyRecordContext.tsx # Context del wizard
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.tsx            # Hook de autenticación
│   │   └── useAliviaAlerts.tsx    # Hook de alertas
│   └── lib/                        # Utilidades
│       ├── api.ts                 # Cliente API
│       ├── apiMock.ts             # API mock completa
│       └── mockData.ts            # Datos mock
├── public/                         # Archivos estáticos
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Desarrollo

### Modo Mock

Por defecto, la aplicación usa datos mock y no requiere backend. Esto permite desarrollo completo offline.

Para conectar con un backend real:
1. Crear archivo `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK=false
```

### Mobile-First Design

- Todas las páginas optimizadas para pantallas de 320px+
- Navegación bottom para móvil, top para tablet+
- Componentes táctiles con áreas mínimas de 44x44px
- Scroll suave y performante
- Touch-friendly interfaces

## Funcionalidades Implementadas

### Autenticación
- Login con datos mock
- Registro de usuarios (paciente/profesional)
- Protección de rutas

### Dashboard
- Resumen de estadísticas
- Widgets informativos
- Acceso rápido a funciones principales

### Wizard de Registro Diario
1. **Localización** - Mapa corporal interactivo
2. **Intensidad** - Escala Wong-Baker FACES
3. **Cualidad** - Tipos de dolor
4. **Duración** - Tiempo del dolor
5. **Impacto Funcional** - Actividades físicas, trabajo, social
6. **Estado Emocional** - PHQ-2 y GAD-2
7. **Medicación** - Registro de medicamentos tomados
8. **Recomendación** - Recomendación automática
9. **Guardar** - Confirmación y guardado

### Gestión de Medicamentos
- Agregar/editar/eliminar medicamentos
- Rueda de medicamentos con recordatorios
- Almacenamiento local (localStorage)

### Historial
- Timeline de registros
- Gráficos de evolución
- Filtros temporales

## Deployment en Vercel

1. Conecta tu repositorio GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. El deployment se hará automáticamente en cada push

### Variables de Entorno (Opcional)

Si quieres conectar con backend real en producción:
- `NEXT_PUBLIC_API_URL`: URL de tu API
- `NEXT_PUBLIC_USE_MOCK`: `false` para usar backend real

## Scripts Disponibles

- `npm run dev` - Desarrollo local (puerto 3000)
- `npm run build` - Build para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter

## Características Mobile

- Bottom navigation bar
- Touch-friendly interfaces
- Optimización de imágenes
- Viewport optimizado
- Safe area support para dispositivos con notch
- Componentes responsive (móvil primero, luego tablet/desktop)

## Notas

Este proyecto es una migración mobile-first del proyecto Alivia original, preservando todas las funcionalidades y animaciones mientras optimiza para dispositivos móviles.

### Datos Mock

La aplicación funciona completamente con datos mock almacenados en:
- `src/lib/apiMock.ts` - Lógica de mock
- `src/lib/mockData.ts` - Datos de ejemplo
- `localStorage` - Para persistencia de sesión y medicamentos

### Próximos Pasos

- [ ] Conectar con backend real
- [ ] Implementar PWA features
- [ ] Optimizaciones adicionales
- [ ] Testing en dispositivos reales

## Licencia

ISC
