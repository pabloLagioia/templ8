module.exports = {
  'layout': /\<layout\s*src=[\"\']([A-Za-z0-9]+)[\"\']\s*\>([\n*\w\s\n*\<\>\.\'\"\=\+\-\_\,\/\?]*)<\/layout\>/m,
  'template': /\<\s*template\s+src=[\"\']([A-Za-z0-9]+)[\"\']\s*\/\s*\>/g,
  'data': /\{\{([A-Za-z0-9\.]+)\}\}/g
}