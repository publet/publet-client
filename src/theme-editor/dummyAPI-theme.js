/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var data = {
  theme: {
    meta: {
      name: "theme name",
      themeID: 1,
      publication: {
        url: "/api/2/publication/736/",
        slug: "test-6j90k",
        id: 736,
        name: "test"
      }
    },
    stylesheet: "https://staging.publet.com/api/2/theme/3/fonts.css",
    palette: [
      {
        hex: "#1d2b54",
        name: "dark blue"
      }, {
        hex: "#1c4382",
        name: "blue"
      }, {
        hex: "#d59439",
        name: "yellow"
      }, {
        hex: "#21635a",
        name: "dark teal"
      }, {
        hex: "#b43833",
        name: "red"
      }, {
        hex: "#9d3434",
        name: "dark red"
      }, {
        hex: "#FFFFFF",
        name: "white"
      }, {
        hex: "#919191",
        name: "grey"
      }, {
        hex: "#333333",
        name: "dark grey"
      }, {
        hex: "#000000",
        name: "black"
      }
    ],
    fonts: [{
      fontFamily: ' "open sans", helvetica, sans-serif',
      name: "open sans"
    }],
    fontSizes: [
      "8px",
      "10px",
      "12px",
      "14px",
      "16px",
      "18px",
      "20px",
      "24px",
      "36px"
    ],
    textStyles: {
      subhead1: {
        style: {
          color: "#919191",
          fontFamily: ' "open sans", helvetica, sans-serif',
          fontSize: "16px",
          fontWeight: "600"
        },
        name: "subhead1"
      },
      title: {
        style: {
          color: "white",
          fontFamily: ' "open sans", helvetica, sans-serif',
          fontSize: "36px",
          textTransform: "none",
          fontWeight: "700"
        },
        name: "title"
      },
      paragraph: {
        style: {
          fontFamily: ' "open sans", helvetica, sans-serif',
          color: "black",
          fontWeight: "400",
          fontSize: "14px",
          letterSpacing: "0px",
          textTransform: "none"
        },
        name: "paragraph"
      },
      header2: {
        style: {
          color: "#1d2b54",
          fontFamily: ' "open sans", helvetica, sans-serif',
          fontSize: "18px",
          fontWeight: "600"
        },
        name: "header2"
      },
      header3: {
        style: {
          color: "#333333",
          fontFamily: ' "open sans", helvetica, sans-serif',
          fontSize: "18px",
          fontWeight: "600"
        },
        name: "header3"
      },
      header1: {
        style: {
          color: "#1d2b54",
          fontFamily: ' "open sans", helvetica, sans-serif',
          fontSize: "24px",
          fontWeight: "700"
        },
        name: "header1"
      }
    },
    buttonStyles: {
      default: {
        style: {
          textTransform: "capitalize",
          borderColor: "dimgray",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: ".85em 1.5em",
          borderRadius: "2px",
          fontSize: "1rem",
          fontWeight: 400,
          background: "grey",
          color: "lightgrey"
        },
        name: "default"
      },
      CTA: {
        style: {
          textTransform: "uppercase",
          borderColor: "silver",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: ".75em 2em",
          borderRadius: "2px",
          fontSize: "1.2rem",
          fontWeight: "800",
          letterSpacing: "2px",
          background: "ghostwhite",
          color: "dimgray"
        },
        name: "CTA"
      },
      secondary: {
        style: {
          background: "darkgrey",
          borderColor: "gray",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: ".85em 1.5em",
          textTransform: "capitalize"
        },
        name: "secondary"
      }
    },
    imageStyles: {
      default: {
        style: {},
        name: "default"
      },
      card: {
        style: {
          padding: ".5em",
          borderColor: "silver",
          borderWidth: "1px",
          borderStyle: "solid",
          background: "whitesmoke",
          borderRadius: "2px"
        },
        name: "card"
      }
    },
    // captionStyles: {
    //   default: "caption-default",
    //   card: "caption-card",
    //   darkOverlay: "caption-dark-overlay"
    // },

    videoStyles: {
      default: {
        style: {},
        name: "default"
      },
      card: {
        style: {
          padding: ".5em",
          borderColor: "silver",
          borderWidth: "1px",
          borderStyle: "solid",
          background: "whitesmoke",
          borderRadius: "2px"
        },
        name: "card"
      }
    },
    quoteStyles: {
      default: {
        style: {},
        name: "default"
      },
      card: {
        style: {
          padding: ".5em",
          borderColor: "silver",
          borderWidth: "1px",
          borderStyle: "solid",
          background: "whitesmoke",
          borderRadius: "2px"
        },
        name: "card"
      }
    }
  }
}

module.exports = data
