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

import Immutable from 'immutable'

export const dashboard = Immutable.fromJS({
  "publication_name": "Lolcats Quarterly",
  "avg_engaged_seconds": 9001,
  "avg_percent_read": 65,
  "readership_by_device": {
    "phone": 45,
    "desktop": 30,
    "tablet": 25
  },
  "shares_by_channel": [
    {
      "name": "facebook",
      "value": 12
    },
    {
      "name": "twitter",
      "value": 3
    },
    {
      "name": "LinkedIn",
      "value": 2
    }
  ],
  "referrals_by_channel": [
    {
      "name": "facebook",
      "value": 40
    },
    {
      "name": "twitter",
      "value": 31
    },
    {
      "name": "LinkedIn",
      "value": 20
    }
  ],
  "articles_by_avg_engaged_seconds": [
    {
      "name": "The Best Article Ever",
      "id": 87,
      "value": 210
    },
    {
      "name": "Second Best Article",
      "id": 88,
      "value": 150
    },
    {
      "name": "Meh Boring Article",
      "id": 89,
      "value": 40
    }
  ],
  "articles_by_avg_percent_read": [
    {
      "name": "The Best Article Ever",
      "id": 87,
      "value": 85
    },
    {
      "name": "Second Best Article",
      "id": 88,
      "value": 50
    },
    {
      "name": "Meh Boring Article",
      "id": 89,
      "value": 35
    }
  ],
  "actions_by_popularity": [
    {
      type: 'navigation',
      name: 'article nav link 2',
      value: 'Cheese is Awesome, part II',
      popularity: 150
    },
    {
      type: 'navigation',
      name: 'article nav link 1',
      value: 'Cheese is Awesome, part I',
      popularity: 150
    },
    {
      type: 'navigation',
      name: 'article nav link 3',
      value: 'Cheese is Awesome, part III',
      popularity: 106
    },
    {
      type: 'button',
      name: 'nav call-to-action',
      value: 'HAZ UR CHEEZBRGR',
      popularity: 88
    },
    {
      type: 'button',
      name: 'gate call-to-action',
      value: 'GET UR CHEEZBRGR',
      popularity: 65
    }
  ],
  "leads_by_time": [
    {
      "date": "some sort of date thing maybe?",
      "leads": "int"
    }
  ],
  "jobs_by_lead": [
    {
      "name": 'Analyst',
      "value": 8
    },
    {
      "name": 'Senior Analyst',
      "value": 6
    },
    {
      "name": 'SVP of Sales',
      "value": 3
    },
    {
      "name": 'Account Executive',
      "value": 1
    },
    {
      "name": 'VP of Sales',
      "value": 1
    }
  ],
  "lead_profiles":[
    {
      "engaged_seconds": 270, // specified unit of int
      "percent_read": 67,
      "profileId": 1,
      "name": "John Jacob"
    },
    {
      "engaged_seconds": 189,
      "percent_read": 85,
      "profileId": 2,
      "name": "Jim Jacob"
    },
    {
      "engaged_seconds": 106,
      "percent_read": 62,
      "profileId": 3,
      "name": "Jane Jacob"
    },
    {
      "engaged_seconds": 75,
      "percent_read": 45,
      "profileId": 4,
      "name": "Jonny Jacob"
    },
    {
      "engaged_seconds": 63,
      "percent_read": 78,
      "profileId": 5,
      "name": "James Jacob"
    },
    {
      "engaged_seconds": 27,
      "percent_read": 32,
      "profileId": 6,
      "name": "Jeremy Jacob"
    }
  ]
})


export const profile = Immutable.fromJS({
  "engaged_seconds": 427,
  "percent_read": 32,
  "profileId": 6,
  "entry_point": "publications.publet.com/lolcats-quarterly/#/ofMiceAndCats",
  "completed_gate": true,
  "gate_data": {
    "name": "Jeremy Jacob",
    "company": "Catbeans, Inc.",
    "job_title": "SVP of Marketing",
    "email": "jjacobs@catbeans.io",
    "photo_url": "http://cdn1.bostonmagazine.com/wp-content/uploads/2013/03/jeremy-jacobs2.jpg",
    // Not enabled in app yet --AB
    "other_gate_fields": [
      {
        "name": "Gate Field",
        "value": "<string>"
      }
    ]
  },
  "location": "Cat's Meow, Wisconsin",
  "device": "Desktop",
  "action_history": [
    {
      "type": 'window',
      "name": 'arrived at publication',
      "value": 'Of Mice & Cats',
      "datetime": '2015-11-09 16:05:07'
    },
    {
      "type": 'navigation',
      "name": 'article nav',
      "value": 'Cheese is Awesome, part II',
      "datetime": '2015-11-09 16:15:07'
    },
    {
      "type": 'button',
      "name": 'nav call-to-action',
      "value": 'YOU CAN HAZ CHSBRGR',
      "datetime": '2015-11-09 16:30:07'
    },
    {
      "type": 'window',
      "name": 'tab lost focus',
      "datetime": '2015-11-09 16:31:07'
    },
    {
      "type": 'window',
      "name": 'tab regained focus',
      "datetime": '2015-11-09 16:34:07'
    },
    {
      "type": 'form',
      "name": 'gate submitted',
      "datetime": '2015-11-09 16:43:07'
    },
    {
      "type": 'media',
      "name": 'pdf downloaded',
      "datetime": '2015-11-09 16:43:09'
    }
  ],
  "pdfs_downloaded": [
    {
      "name": "Lolcats Quarterly, volume IV"
    }
  ]
})
