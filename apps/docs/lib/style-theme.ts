// Design theme switch for the docs site (Mintel or Clarity), shared by the head script and the header button.
export const STYLE_KEY = "mintel-theme"

/** Applies the saved design theme before paint, like the dark-mode script. */
export const styleScript = `try{if(localStorage.getItem("${STYLE_KEY}")==="clarity")document.documentElement.setAttribute("data-mintel-theme","clarity")}catch(e){}`
