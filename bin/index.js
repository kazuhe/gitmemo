#!/usr/bin/env node

import { join, dirname } from 'node:path'
import { serve } from "../dist/server/index.js"

const __dirname = dirname(new URL(import.meta.url).pathname)
const publicDir = join(__dirname, "..", "dist", "client")
serve(publicDir)
