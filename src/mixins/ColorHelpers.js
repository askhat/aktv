export default {
  methods: {
    /**
     * Converts hex to rgb
     * @param {string} hex hexidemal representation of a color
     * @returns {Object} object representing rgb color
     */
    hex2rgb (hex) {
      hex = hex.replace('#', '')
      const r = parseInt(hex.substring(0,2), 16)
      const g = parseInt(hex.substring(2,4), 16)
      const b = parseInt(hex.substring(4,6), 16)
      return { r, g, b }
    },
    isLight (color) {
      if (typeof color === 'string') {
        color = this.hex2rgb(color)
      }
      const { r, g, b } = color
      var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
      return (a < 0.5)
    }
  }
}
