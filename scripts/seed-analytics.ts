/**
 * Seed the Supabase analytics table with estimated view/download counts
 * for all existing characters.
 *
 * Uses upsert — safe to re-run; existing rows are updated, missing rows are inserted.
 *
 * Usage:
 *   npx ts-node scripts/seed-analytics.ts
 *
 * Requires in .env.local:
 *   SUPABASE_URL=https://your-project.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const entries = [
  // The Sopranos
  { slug: 'tony-soprano',         views: 523, downloads: 178 },
  { slug: 'christopher-moltisanti', views: 218, downloads: 61  },
  { slug: 'paulie-gualtieri',     views: 42,  downloads: 12  },
  { slug: 'silvio-dante',         views: 54,  downloads: 18  },
  { slug: 'ralph-cifaretto',      views: 23,  downloads: 8   },
  { slug: 'tony-blundetto',       views: 96,  downloads: 29  },

  // Breaking Bad
  { slug: 'walter-white',         views: 314, downloads: 89  },
  { slug: 'jesse-pinkman',        views: 83,  downloads: 34  },

  // Better Call Saul
  { slug: 'jimmy-mcgill',         views: 43,  downloads: 9   },
  { slug: 'kim-wexler',           views: 22,  downloads: 6   },
  { slug: 'lalo-salamanca',       views: 210, downloads: 107 },

  // Game of Thrones
  { slug: 'jon-snow',             views: 312, downloads: 131 },
  { slug: 'daenerys-targaryen',   views: 122, downloads: 47  },
  { slug: 'arya-stark',           views: 86,  downloads: 30  },
  { slug: 'jaime-lannister',      views: 71,  downloads: 22  },
  { slug: 'ned-stark',            views: 68,  downloads: 19  },
  { slug: 'robb-stark',           views: 74,  downloads: 20  },
  { slug: 'oberyn-martell',       views: 36,  downloads: 10  },

  // Prison Break
  { slug: 'alexander-mahone',     views: 41,  downloads: 13  },
  { slug: 'paul-kellerman',       views: 24,  downloads: 7   },

  // Sons of Anarchy
  { slug: 'jax-teller',           views: 32,  downloads: 8   },

  // You
  { slug: 'joe-goldberg',         views: 110, downloads: 31  },

  // Barry
  { slug: 'barry-berkman',        views: 27,  downloads: 6   },

  // The Bear
  { slug: 'carmy-berzatto',       views: 24,  downloads: 6   },

  // The Boys
  { slug: 'homelander',           views: 12,  downloads: 2   },

  // Batman 2022
  { slug: 'batman',               views: 35,  downloads: 11  },

  // MCU
  { slug: 'iron-man',             views: 317, downloads: 97  },
  { slug: 'spider-man',           views: 87,  downloads: 24  },
  { slug: 'thanos',               views: 42,  downloads: 16  },

  // Batman Arkham
  { slug: 'batman-arkham',        views: 22,  downloads: 8   },
  { slug: 'arkham-joker',         views: 16,  downloads: 5   },

  // Batman BTAS
  { slug: 'batman-btas',          views: 14,  downloads: 3   },
  { slug: 'btas-joker',           views: 11,  downloads: 3   },

  // RDR2
  { slug: 'arthur-morgan',        views: 34,  downloads: 9   },
  { slug: 'micah-bell',           views: 12,  downloads: 2   },
].map(e => ({ ...e, type: 'character' as const }))

async function main() {
  console.log(`Upserting ${entries.length} entries into analytics table…\n`)

  const { data, error } = await supabase
    .from('analytics')
    .upsert(entries, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Supabase error:', error.message)
    process.exit(1)
  }

  console.log(`✓ Done. ${data?.length ?? entries.length} rows upserted.`)
  entries.forEach(e =>
    console.log(`  ${e.slug.padEnd(28)} views: ${String(e.views).padStart(4)}  downloads: ${e.downloads}`)
  )
}

main()
