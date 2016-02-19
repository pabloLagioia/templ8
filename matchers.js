module.exports = {
  'container': /\<container\s*src=[\"\']([A-Za-z0-9\/\-\.\_]+)[\"\']\s*\>([\&\n*\w\s\n*\<\>\.\'\"\=\+\-\_\,\/\?\!\$\%\^\#\{\}\(\)\~\`\‘\“\|\"\;\'\:]*)<\/container\>/m,
  'template': /\<\s*template\s+src=[\"\']([A-Za-z0-9\/\-\.\_]+)[\"\']\s*\/\s*\>/g,
  'data': /\{\{([A-Za-z0-9\.\_\$]+)\}\}/g,
  'content': /\<content\>/
}