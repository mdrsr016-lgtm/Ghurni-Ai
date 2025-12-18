# Color Palette

This document contains the detailed color palette extracted from the project's CSS configuration.

## Custom Green Color Palette

### Turf Green

| Name             | Hex Code  |
| ---------------- | --------- |
| `turf-green-50`  | `#eafaf4` |
| `turf-green-100` | `#d5f6e8` |
| `turf-green-200` | `#acecd1` |
| `turf-green-300` | `#82e3bb` |
| `turf-green-400` | `#59d9a4` |
| `turf-green-500` | `#2fd08d` |
| `turf-green-600` | `#26a671` |
| `turf-green-700` | `#1c7d55` |
| `turf-green-800` | `#135338` |
| `turf-green-900` | `#092a1c` |
| `turf-green-950` | `#071d14` |

### Celadon

| Name          | Hex Code  |
| ------------- | --------- |
| `celadon-50`  | `#eafbf2` |
| `celadon-100` | `#d5f6e4` |
| `celadon-200` | `#aaeeca` |
| `celadon-300` | `#80e5af` |
| `celadon-400` | `#56dc95` |
| `celadon-500` | `#2bd47a` |
| `celadon-600` | `#23a962` |
| `celadon-700` | `#1a7f49` |
| `celadon-800` | `#115531` |
| `celadon-900` | `#092a18` |
| `celadon-950` | `#061e11` |

### Tea Green

| Name            | Hex Code  |
| --------------- | --------- |
| `tea-green-50`  | `#f3fbea` |
| `tea-green-100` | `#e6f7d4` |
| `tea-green-200` | `#cdefa9` |
| `tea-green-300` | `#b4e77e` |
| `tea-green-400` | `#9bde54` |
| `tea-green-500` | `#82d629` |
| `tea-green-600` | `#68ab21` |
| `tea-green-700` | `#4e8118` |
| `tea-green-800` | `#345610` |
| `tea-green-900` | `#1a2b08` |
| `tea-green-950` | `#121e06` |

### Dark Spruce

| Name              | Hex Code  |
| ----------------- | --------- |
| `dark-spruce-50`  | `#ecf9f0` |
| `dark-spruce-100` | `#d9f2e1` |
| `dark-spruce-200` | `#b3e6c4` |
| `dark-spruce-300` | `#8cd9a6` |
| `dark-spruce-400` | `#66cc88` |
| `dark-spruce-500` | `#40bf6a` |
| `dark-spruce-600` | `#339955` |
| `dark-spruce-700` | `#267340` |
| `dark-spruce-800` | `#194d2b` |
| `dark-spruce-900` | `#0d2615` |
| `dark-spruce-950` | `#091b0f` |

### Yellow Green

| Name               | Hex Code  |
| ------------------ | --------- |
| `yellow-green-50`  | `#f5f9eb` |
| `yellow-green-100` | `#ecf3d8` |
| `yellow-green-200` | `#d9e8b0` |
| `yellow-green-300` | `#c6dc89` |
| `yellow-green-400` | `#b3d062` |
| `yellow-green-500` | `#a0c43b` |
| `yellow-green-600` | `#809d2f` |
| `yellow-green-700` | `#607623` |
| `yellow-green-800` | `#404f17` |
| `yellow-green-900` | `#20270c` |
| `yellow-green-950` | `#161b08` |

## Gradient Definitions

### Light Mode Gradient

"Soft, inviting travel colors: Sky Blue, Light Sand, Ocean Mist"

- `#D6E6F2` (0%)
- `#B8D5E3` (25%)
- `#F5EBE0` (50%)
- `#D6E6F2` (75%)
- `#B8D5E3` (100%)

### Dark Mode Gradient

"Deep, sophisticated travel colors: Deep Navy, Midnight Teal, Cosmic Purple"

- `#0E1C36` (0%)
- `#1B2A49` (25%)
- `#3E5C76` (50%)
- `#0E1C36` (75%)
- `#1B2A49` (100%)

## Usage

These custom colors are integrated into the Tailwind CSS theme configuration and can be used with standard Tailwind utility classes.

### Text Color

Use `text-{color}-{shade}` to apply text color.
**Example:** `text-turf-green-500`

### Background Color

Use `bg-{color}-{shade}` to apply background color.
**Example:** `bg-celadon-300`

### Border Color

Use `border-{color}-{shade}` to apply border color.
**Example:** `border-tea-green-700`

### Gradients

The gradients are defined as custom classes in `src/index.css`.

- `.gradient-light`
- `.gradient-dark`
