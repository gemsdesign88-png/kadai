#!/usr/bin/env -S deno run --allow-read --allow-net

/**
 * Supabase Edge Function Deployment Helper
 * Deploy restaurant-api function to Supabase
 * 
 * Usage:
 *   deno run --allow-read --allow-net deploy-edge-function.ts \
 *     --project bigjlzrnlzcfxwlkstpp \
 *     --key <SERVICE_ROLE_KEY>
 */

declare const Deno: {
  readTextFile(path: string): Promise<string>
  exit(code: number): never
  args: string[]
}

// deno-lint-ignore no-empty-interface
interface DeployOptions {
  projectId: string
  serviceRoleKey: string
  functionName: string
  sourceFile: string
}

async function deployFunction(options: DeployOptions): Promise<void> {
  const { projectId, serviceRoleKey, functionName, sourceFile } = options

  try {
    console.log(`📦 Reading function code from: ${sourceFile}`)
    const functionCode = await Deno.readTextFile(sourceFile)
    
    const supabaseUrl = `https://${projectId}.supabase.co`
    const deployUrl = `${supabaseUrl}/functions/v1/${functionName}`
    
    console.log(`🚀 Deploying to: ${deployUrl}`)
    
    const response = await fetch(deployUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/typescript',
      },
      body: functionCode,
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`❌ Deployment failed: ${response.status} ${response.statusText}`)
      console.error('Response:', errorBody)
      Deno.exit(1)
    }

    console.log(`✅ Function deployed successfully!`)
    
    // Wait a moment for the function to be ready
    console.log('⏳ Waiting for function to be ready...')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Test the function
    const testResponse = await fetch(deployUrl, {
      method: 'OPTIONS',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
    })
    
    if (testResponse.ok) {
      console.log(`✨ Function is ready and accessible!`)
    }

  } catch (error) {
    console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
    Deno.exit(1)
  }
}

// Parse command line arguments
const args = Deno.args
let projectId = 'bigjlzrnlzcfxwlkstpp'
let serviceRoleKey = ''
let functionName = 'restaurant-api'
let sourceFile = './supabase/functions/restaurant-api/index.ts'

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--project':
      projectId = args[++i]
      break
    case '--key':
      serviceRoleKey = args[++i]
      break
    case '--function':
      functionName = args[++i]
      break
    case '--source':
      sourceFile = args[++i]
      break
    case '--help':
    case '-h':
      console.log(`
Supabase Edge Function Deployment Helper

Usage:
  deno run --allow-read --allow-net deploy-edge-function.ts [options]

Options:
  --project <id>          Supabase project ID (default: bigjlzrnlzcfxwlkstpp)
  --key <key>            Service role key (REQUIRED for deployment)
  --function <name>      Function name (default: restaurant-api)
  --source <path>        Source file path (default: ./supabase/functions/restaurant-api/index.ts)
  --help                 Show this help message

Example:
  deno run --allow-read --allow-net deploy-edge-function.ts \\
    --project bigjlzrnlzcfxwlkstpp \\
    --key eyJhbGciOi...

Note:
  The service role key can be found in:
  1. Supabase Dashboard → Settings → API
  2. Or in your .env.production file
  3. Or provided by your team lead
      `)
      Deno.exit(0)
  }
}

if (!serviceRoleKey) {
  console.error('❌ Error: --key (service role key) is required')
  console.error('Run with --help for more information')
  Deno.exit(1)
}

console.log('🔐 Supabase Edge Function Deployment')
console.log(`📍 Project: ${projectId}`)
console.log(`📝 Function: ${functionName}`)
console.log('')

await deployFunction({
  projectId,
  serviceRoleKey,
  functionName,
  sourceFile,
})

export {}
