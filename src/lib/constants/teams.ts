import { Region } from "@/types";

export interface TeamSeed {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  region: Region;
  espnId: number;
  isFirstFour: boolean;
}

export function getTeamLogoUrl(espnId: number): string {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png`;
}

export const NCAA_TEAMS: TeamSeed[] = [
  // ===== EAST REGION =====
  { id: "duke", name: "Duke Blue Devils", shortName: "Duke", seed: 1, region: "East", espnId: 150, isFirstFour: false },
  { id: "alabama", name: "Alabama Crimson Tide", shortName: "Alabama", seed: 2, region: "East", espnId: 333, isFirstFour: false },
  { id: "wisconsin", name: "Wisconsin Badgers", shortName: "Wisconsin", seed: 3, region: "East", espnId: 275, isFirstFour: false },
  { id: "arizona", name: "Arizona Wildcats", shortName: "Arizona", seed: 4, region: "East", espnId: 12, isFirstFour: false },
  { id: "oregon", name: "Oregon Ducks", shortName: "Oregon", seed: 5, region: "East", espnId: 2483, isFirstFour: false },
  { id: "byu", name: "BYU Cougars", shortName: "BYU", seed: 6, region: "East", espnId: 252, isFirstFour: false },
  { id: "st-johns", name: "St. John's Red Storm", shortName: "St. John's", seed: 7, region: "East", espnId: 2599, isFirstFour: false },
  { id: "uconn", name: "UConn Huskies", shortName: "UConn", seed: 8, region: "East", espnId: 41, isFirstFour: false },
  { id: "oklahoma", name: "Oklahoma Sooners", shortName: "Oklahoma", seed: 9, region: "East", espnId: 201, isFirstFour: false },
  { id: "arkansas", name: "Arkansas Razorbacks", shortName: "Arkansas", seed: 10, region: "East", espnId: 8, isFirstFour: false },
  { id: "drake", name: "Drake Bulldogs", shortName: "Drake", seed: 11, region: "East", espnId: 2181, isFirstFour: false },
  { id: "uc-san-diego", name: "UC San Diego Tritons", shortName: "UCSD", seed: 12, region: "East", espnId: 28, isFirstFour: false },
  { id: "yale", name: "Yale Bulldogs", shortName: "Yale", seed: 13, region: "East", espnId: 43, isFirstFour: false },
  { id: "lipscomb", name: "Lipscomb Bisons", shortName: "Lipscomb", seed: 14, region: "East", espnId: 288, isFirstFour: false },
  { id: "bryant", name: "Bryant Bulldogs", shortName: "Bryant", seed: 15, region: "East", espnId: 2803, isFirstFour: false },
  { id: "american", name: "American Eagles", shortName: "American", seed: 16, region: "East", espnId: 44, isFirstFour: false },

  // ===== WEST REGION =====
  { id: "florida", name: "Florida Gators", shortName: "Florida", seed: 1, region: "West", espnId: 57, isFirstFour: false },
  { id: "st-marys", name: "Saint Mary's Gaels", shortName: "St. Mary's", seed: 2, region: "West", espnId: 2608, isFirstFour: false },
  { id: "baylor", name: "Baylor Bears", shortName: "Baylor", seed: 3, region: "West", espnId: 239, isFirstFour: false },
  { id: "gonzaga", name: "Gonzaga Bulldogs", shortName: "Gonzaga", seed: 4, region: "West", espnId: 2250, isFirstFour: false },
  { id: "clemson", name: "Clemson Tigers", shortName: "Clemson", seed: 5, region: "West", espnId: 228, isFirstFour: false },
  { id: "illinois", name: "Illinois Fighting Illini", shortName: "Illinois", seed: 6, region: "West", espnId: 356, isFirstFour: false },
  { id: "new-mexico", name: "New Mexico Lobos", shortName: "New Mexico", seed: 7, region: "West", espnId: 167, isFirstFour: false },
  { id: "ucla", name: "UCLA Bruins", shortName: "UCLA", seed: 8, region: "West", espnId: 26, isFirstFour: false },
  { id: "georgia", name: "Georgia Bulldogs", shortName: "Georgia", seed: 9, region: "West", espnId: 61, isFirstFour: false },
  { id: "vanderbilt", name: "Vanderbilt Commodores", shortName: "Vanderbilt", seed: 10, region: "West", espnId: 238, isFirstFour: false },
  { id: "nc-state", name: "NC State Wolfpack", shortName: "NC State", seed: 11, region: "West", espnId: 152, isFirstFour: false },
  { id: "troy", name: "Troy Trojans", shortName: "Troy", seed: 12, region: "West", espnId: 2653, isFirstFour: false },
  { id: "vermont", name: "Vermont Catamounts", shortName: "Vermont", seed: 13, region: "West", espnId: 261, isFirstFour: false },
  { id: "wofford", name: "Wofford Terriers", shortName: "Wofford", seed: 14, region: "West", espnId: 2747, isFirstFour: false },
  { id: "omaha", name: "Nebraska Omaha Mavericks", shortName: "Omaha", seed: 15, region: "West", espnId: 2437, isFirstFour: false },
  { id: "norfolk-state", name: "Norfolk State Spartans", shortName: "Norfolk St.", seed: 16, region: "West", espnId: 2450, isFirstFour: false },

  // ===== SOUTH REGION =====
  { id: "auburn", name: "Auburn Tigers", shortName: "Auburn", seed: 1, region: "South", espnId: 2, isFirstFour: false },
  { id: "michigan-state", name: "Michigan State Spartans", shortName: "Michigan St.", seed: 2, region: "South", espnId: 127, isFirstFour: false },
  { id: "iowa-state", name: "Iowa State Cyclones", shortName: "Iowa State", seed: 3, region: "South", espnId: 66, isFirstFour: false },
  { id: "texas-am", name: "Texas A&M Aggies", shortName: "Texas A&M", seed: 4, region: "South", espnId: 245, isFirstFour: false },
  { id: "michigan", name: "Michigan Wolverines", shortName: "Michigan", seed: 5, region: "South", espnId: 130, isFirstFour: false },
  { id: "missouri", name: "Missouri Tigers", shortName: "Missouri", seed: 6, region: "South", espnId: 142, isFirstFour: false },
  { id: "kansas", name: "Kansas Jayhawks", shortName: "Kansas", seed: 7, region: "South", espnId: 2305, isFirstFour: false },
  { id: "louisville", name: "Louisville Cardinals", shortName: "Louisville", seed: 8, region: "South", espnId: 97, isFirstFour: false },
  { id: "creighton", name: "Creighton Bluejays", shortName: "Creighton", seed: 9, region: "South", espnId: 156, isFirstFour: false },
  { id: "purdue", name: "Purdue Boilermakers", shortName: "Purdue", seed: 10, region: "South", espnId: 2509, isFirstFour: false },
  { id: "texas-tech", name: "Texas Tech Red Raiders", shortName: "Texas Tech", seed: 11, region: "South", espnId: 2641, isFirstFour: false },
  { id: "uc-irvine", name: "UC Irvine Anteaters", shortName: "UC Irvine", seed: 12, region: "South", espnId: 300, isFirstFour: false },
  { id: "high-point", name: "High Point Panthers", shortName: "High Point", seed: 13, region: "South", espnId: 2272, isFirstFour: false },
  { id: "grand-canyon", name: "Grand Canyon Antelopes", shortName: "Grand Canyon", seed: 14, region: "South", espnId: 2253, isFirstFour: false },
  { id: "montana", name: "Montana Grizzlies", shortName: "Montana", seed: 15, region: "South", espnId: 149, isFirstFour: false },
  { id: "siu-edwardsville", name: "SIU Edwardsville Cougars", shortName: "SIUE", seed: 16, region: "South", espnId: 2565, isFirstFour: false },

  // ===== MIDWEST REGION =====
  { id: "houston", name: "Houston Cougars", shortName: "Houston", seed: 1, region: "Midwest", espnId: 248, isFirstFour: false },
  { id: "tennessee", name: "Tennessee Volunteers", shortName: "Tennessee", seed: 2, region: "Midwest", espnId: 2633, isFirstFour: false },
  { id: "kentucky", name: "Kentucky Wildcats", shortName: "Kentucky", seed: 3, region: "Midwest", espnId: 96, isFirstFour: false },
  { id: "marquette", name: "Marquette Golden Eagles", shortName: "Marquette", seed: 4, region: "Midwest", espnId: 269, isFirstFour: false },
  { id: "texas", name: "Texas Longhorns", shortName: "Texas", seed: 5, region: "Midwest", espnId: 251, isFirstFour: false },
  { id: "mississippi-state", name: "Mississippi State Bulldogs", shortName: "Miss. State", seed: 6, region: "Midwest", espnId: 344, isFirstFour: false },
  { id: "maryland", name: "Maryland Terrapins", shortName: "Maryland", seed: 7, region: "Midwest", espnId: 120, isFirstFour: false },
  { id: "memphis", name: "Memphis Tigers", shortName: "Memphis", seed: 8, region: "Midwest", espnId: 235, isFirstFour: false },
  { id: "colorado", name: "Colorado Buffaloes", shortName: "Colorado", seed: 9, region: "Midwest", espnId: 38, isFirstFour: false },
  { id: "pittsburgh", name: "Pittsburgh Panthers", shortName: "Pittsburgh", seed: 10, region: "Midwest", espnId: 221, isFirstFour: false },
  { id: "liberty", name: "Liberty Flames", shortName: "Liberty", seed: 11, region: "Midwest", espnId: 2335, isFirstFour: false },
  { id: "vcu", name: "VCU Rams", shortName: "VCU", seed: 12, region: "Midwest", espnId: 2670, isFirstFour: false },
  { id: "north-carolina-wilmington", name: "UNC Wilmington Seahawks", shortName: "UNCW", seed: 13, region: "Midwest", espnId: 350, isFirstFour: false },
  { id: "robert-morris", name: "Robert Morris Colonials", shortName: "Robert Morris", seed: 14, region: "Midwest", espnId: 2523, isFirstFour: false },
  { id: "southeast-missouri-state", name: "SE Missouri State Redhawks", shortName: "SEMO", seed: 15, region: "Midwest", espnId: 2546, isFirstFour: false },
  { id: "long-island", name: "LIU Sharks", shortName: "LIU", seed: 16, region: "Midwest", espnId: 2344, isFirstFour: false },

  // ===== FIRST FOUR =====
  { id: "san-diego-state", name: "San Diego State Aztecs", shortName: "SDSU", seed: 11, region: "West", espnId: 21, isFirstFour: true },
  { id: "xavier", name: "Xavier Musketeers", shortName: "Xavier", seed: 11, region: "South", espnId: 2752, isFirstFour: true },
  { id: "alabama-st", name: "Alabama State Hornets", shortName: "Alabama St.", seed: 16, region: "East", espnId: 2011, isFirstFour: true },
  { id: "tcu", name: "TCU Horned Frogs", shortName: "TCU", seed: 11, region: "Midwest", espnId: 2628, isFirstFour: true },
];
