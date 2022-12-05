'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_OPENAI_KEY: '"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"'
})
