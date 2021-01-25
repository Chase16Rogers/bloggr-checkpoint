import { AppState } from '../AppState'

class ColorRando {
  randomColor() {
    AppState.color++
    if (AppState.color > 7) {
      AppState.color = 1
    }
    const num = AppState.color
    switch (num) {
      case 1:
        return 'red'
      case 2:
        return 'orange'
      case 3:
        return 'yellow'
      case 4:
        return 'green'
      case 5:
        return 'indigo'
      case 6:
        return 'blue'
      case 7:
        return 'purple'
      default:
        return 'yellow'
    }
  }
}
export const colorRando = new ColorRando()
