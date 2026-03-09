import { Region } from "@/types";

export interface TeamSeed {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  region: Region;
  espnId: number;
  isFirstFour: boolean;
  record: string;
}

export function getTeamLogoUrl(espnId: number): string {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png`;
}

export const NCAA_TEAMS: TeamSeed[] = [
  // ===== EAST REGION =====
  { id: "duke", name: "Duke Blue Devils", shortName: "Duke", seed: 1, region: "East", espnId: 150, isFirstFour: false, record: "29-2" },
  { id: "alabama", name: "Alabama Crimson Tide", shortName: "Alabama", seed: 2, region: "East", espnId: 333, isFirstFour: false, record: "23-8" },
  { id: "wisconsin", name: "Wisconsin Badgers", shortName: "Wisconsin", seed: 3, region: "East", espnId: 275, isFirstFour: false, record: "22-9" },
  { id: "arizona", name: "Arizona Wildcats", shortName: "Arizona", seed: 4, region: "East", espnId: 12, isFirstFour: false, record: "29-2" },
  { id: "oregon", name: "Oregon Ducks", shortName: "Oregon", seed: 5, region: "East", espnId: 2483, isFirstFour: false, record: "12-19" },
  { id: "byu", name: "BYU Cougars", shortName: "BYU", seed: 6, region: "East", espnId: 252, isFirstFour: false, record: "21-10" },
  { id: "st-johns", name: "St. John's Red Storm", shortName: "St. John's", seed: 7, region: "East", espnId: 2599, isFirstFour: false, record: "25-6" },
  { id: "uconn", name: "UConn Huskies", shortName: "UConn", seed: 8, region: "East", espnId: 41, isFirstFour: false, record: "27-4" },
  { id: "oklahoma", name: "Oklahoma Sooners", shortName: "Oklahoma", seed: 9, region: "East", espnId: 201, isFirstFour: false, record: "17-14" },
  { id: "arkansas", name: "Arkansas Razorbacks", shortName: "Arkansas", seed: 10, region: "East", espnId: 8, isFirstFour: false, record: "23-8" },
  { id: "drake", name: "Drake Bulldogs", shortName: "Drake", seed: 11, region: "East", espnId: 2181, isFirstFour: false, record: "14-20" },
  { id: "uc-san-diego", name: "UC San Diego Tritons", shortName: "UCSD", seed: 12, region: "East", espnId: 28, isFirstFour: false, record: "22-10" },
  { id: "yale", name: "Yale Bulldogs", shortName: "Yale", seed: 13, region: "East", espnId: 43, isFirstFour: false, record: "23-5" },
  { id: "lipscomb", name: "Lipscomb Bisons", shortName: "Lipscomb", seed: 14, region: "East", espnId: 288, isFirstFour: false, record: "19-13" },
  { id: "bryant", name: "Bryant Bulldogs", shortName: "Bryant", seed: 15, region: "East", espnId: 2803, isFirstFour: false, record: "9-22" },
  { id: "american", name: "American Eagles", shortName: "American", seed: 16, region: "East", espnId: 44, isFirstFour: false, record: "16-16" },

  // ===== WEST REGION =====
  { id: "florida", name: "Florida Gators", shortName: "Florida", seed: 1, region: "West", espnId: 57, isFirstFour: false, record: "25-6" },
  { id: "st-marys", name: "Saint Mary's Gaels", shortName: "St. Mary's", seed: 2, region: "West", espnId: 2608, isFirstFour: false, record: "27-4" },
  { id: "baylor", name: "Baylor Bears", shortName: "Baylor", seed: 3, region: "West", espnId: 239, isFirstFour: false, record: "16-15" },
  { id: "gonzaga", name: "Gonzaga Bulldogs", shortName: "Gonzaga", seed: 4, region: "West", espnId: 2250, isFirstFour: false, record: "28-3" },
  { id: "clemson", name: "Clemson Tigers", shortName: "Clemson", seed: 5, region: "West", espnId: 228, isFirstFour: false, record: "22-9" },
  { id: "illinois", name: "Illinois Fighting Illini", shortName: "Illinois", seed: 6, region: "West", espnId: 356, isFirstFour: false, record: "24-7" },
  { id: "new-mexico", name: "New Mexico Lobos", shortName: "New Mexico", seed: 7, region: "West", espnId: 167, isFirstFour: false, record: "22-9" },
  { id: "ucla", name: "UCLA Bruins", shortName: "UCLA", seed: 8, region: "West", espnId: 26, isFirstFour: false, record: "21-10" },
  { id: "georgia", name: "Georgia Bulldogs", shortName: "Georgia", seed: 9, region: "West", espnId: 61, isFirstFour: false, record: "22-9" },
  { id: "vanderbilt", name: "Vanderbilt Commodores", shortName: "Vanderbilt", seed: 10, region: "West", espnId: 238, isFirstFour: false, record: "24-7" },
  { id: "nc-state", name: "NC State Wolfpack", shortName: "NC State", seed: 11, region: "West", espnId: 152, isFirstFour: false, record: "19-12" },
  { id: "troy", name: "Troy Trojans", shortName: "Troy", seed: 12, region: "West", espnId: 2653, isFirstFour: false, record: "20-11" },
  { id: "vermont", name: "Vermont Catamounts", shortName: "Vermont", seed: 13, region: "West", espnId: 261, isFirstFour: false, record: "21-11" },
  { id: "wofford", name: "Wofford Terriers", shortName: "Wofford", seed: 14, region: "West", espnId: 2747, isFirstFour: false, record: "19-13" },
  { id: "omaha", name: "Nebraska Omaha Mavericks", shortName: "Omaha", seed: 15, region: "West", espnId: 2437, isFirstFour: false, record: "16-17" },
  { id: "norfolk-state", name: "Norfolk State Spartans", shortName: "Norfolk St.", seed: 16, region: "West", espnId: 2450, isFirstFour: false, record: "15-16" },

  // ===== SOUTH REGION =====
  { id: "auburn", name: "Auburn Tigers", shortName: "Auburn", seed: 1, region: "South", espnId: 2, isFirstFour: false, record: "16-15" },
  { id: "michigan-state", name: "Michigan State Spartans", shortName: "Michigan St.", seed: 2, region: "South", espnId: 127, isFirstFour: false, record: "25-6" },
  { id: "iowa-state", name: "Iowa State Cyclones", shortName: "Iowa State", seed: 3, region: "South", espnId: 66, isFirstFour: false, record: "25-6" },
  { id: "texas-am", name: "Texas A&M Aggies", shortName: "Texas A&M", seed: 4, region: "South", espnId: 245, isFirstFour: false, record: "21-10" },
  { id: "michigan", name: "Michigan Wolverines", shortName: "Michigan", seed: 5, region: "South", espnId: 130, isFirstFour: false, record: "29-2" },
  { id: "missouri", name: "Missouri Tigers", shortName: "Missouri", seed: 6, region: "South", espnId: 142, isFirstFour: false, record: "20-11" },
  { id: "kansas", name: "Kansas Jayhawks", shortName: "Kansas", seed: 7, region: "South", espnId: 2305, isFirstFour: false, record: "22-9" },
  { id: "louisville", name: "Louisville Cardinals", shortName: "Louisville", seed: 8, region: "South", espnId: 97, isFirstFour: false, record: "22-9" },
  { id: "creighton", name: "Creighton Bluejays", shortName: "Creighton", seed: 9, region: "South", espnId: 156, isFirstFour: false, record: "15-16" },
  { id: "purdue", name: "Purdue Boilermakers", shortName: "Purdue", seed: 10, region: "South", espnId: 2509, isFirstFour: false, record: "23-8" },
  { id: "texas-tech", name: "Texas Tech Red Raiders", shortName: "Texas Tech", seed: 11, region: "South", espnId: 2641, isFirstFour: false, record: "22-9" },
  { id: "uc-irvine", name: "UC Irvine Anteaters", shortName: "UC Irvine", seed: 12, region: "South", espnId: 300, isFirstFour: false, record: "22-10" },
  { id: "high-point", name: "High Point Panthers", shortName: "High Point", seed: 13, region: "South", espnId: 2272, isFirstFour: false, record: "30-4" },
  { id: "grand-canyon", name: "Grand Canyon Antelopes", shortName: "Grand Canyon", seed: 14, region: "South", espnId: 2253, isFirstFour: false, record: "20-11" },
  { id: "montana", name: "Montana Grizzlies", shortName: "Montana", seed: 15, region: "South", espnId: 149, isFirstFour: false, record: "16-15" },
  { id: "siu-edwardsville", name: "SIU Edwardsville Cougars", shortName: "SIUE", seed: 16, region: "South", espnId: 2565, isFirstFour: false, record: "19-13" },

  // ===== MIDWEST REGION =====
  { id: "houston", name: "Houston Cougars", shortName: "Houston", seed: 1, region: "Midwest", espnId: 248, isFirstFour: false, record: "26-5" },
  { id: "tennessee", name: "Tennessee Volunteers", shortName: "Tennessee", seed: 2, region: "Midwest", espnId: 2633, isFirstFour: false, record: "21-10" },
  { id: "kentucky", name: "Kentucky Wildcats", shortName: "Kentucky", seed: 3, region: "Midwest", espnId: 96, isFirstFour: false, record: "19-12" },
  { id: "marquette", name: "Marquette Golden Eagles", shortName: "Marquette", seed: 4, region: "Midwest", espnId: 269, isFirstFour: false, record: "12-19" },
  { id: "texas", name: "Texas Longhorns", shortName: "Texas", seed: 5, region: "Midwest", espnId: 251, isFirstFour: false, record: "18-13" },
  { id: "mississippi-state", name: "Mississippi State Bulldogs", shortName: "Miss. State", seed: 6, region: "Midwest", espnId: 344, isFirstFour: false, record: "13-18" },
  { id: "maryland", name: "Maryland Terrapins", shortName: "Maryland", seed: 7, region: "Midwest", espnId: 120, isFirstFour: false, record: "11-20" },
  { id: "memphis", name: "Memphis Tigers", shortName: "Memphis", seed: 8, region: "Midwest", espnId: 235, isFirstFour: false, record: "13-18" },
  { id: "colorado", name: "Colorado Buffaloes", shortName: "Colorado", seed: 9, region: "Midwest", espnId: 38, isFirstFour: false, record: "17-14" },
  { id: "pittsburgh", name: "Pittsburgh Panthers", shortName: "Pittsburgh", seed: 10, region: "Midwest", espnId: 221, isFirstFour: false, record: "12-19" },
  { id: "liberty", name: "Liberty Flames", shortName: "Liberty", seed: 11, region: "Midwest", espnId: 2335, isFirstFour: false, record: "25-6" },
  { id: "vcu", name: "VCU Rams", shortName: "VCU", seed: 12, region: "Midwest", espnId: 2670, isFirstFour: false, record: "24-7" },
  { id: "north-carolina-wilmington", name: "UNC Wilmington Seahawks", shortName: "UNCW", seed: 13, region: "Midwest", espnId: 350, isFirstFour: false, record: "26-6" },
  { id: "robert-morris", name: "Robert Morris Colonials", shortName: "Robert Morris", seed: 14, region: "Midwest", espnId: 2523, isFirstFour: false, record: "22-10" },
  { id: "southeast-missouri-state", name: "SE Missouri State Redhawks", shortName: "SEMO", seed: 15, region: "Midwest", espnId: 2546, isFirstFour: false, record: "20-13" },
  { id: "long-island", name: "LIU Sharks", shortName: "LIU", seed: 16, region: "Midwest", espnId: 2344, isFirstFour: false, record: "16-16" },

  // ===== FIRST FOUR =====
  { id: "san-diego-state", name: "San Diego State Aztecs", shortName: "SDSU", seed: 11, region: "West", espnId: 21, isFirstFour: true, record: "20-10" },
  { id: "xavier", name: "Xavier Musketeers", shortName: "Xavier", seed: 11, region: "South", espnId: 2752, isFirstFour: true, record: "14-17" },
  { id: "alabama-st", name: "Alabama State Hornets", shortName: "Alabama St.", seed: 16, region: "East", espnId: 2011, isFirstFour: true, record: "10-21" },
  { id: "tcu", name: "TCU Horned Frogs", shortName: "TCU", seed: 11, region: "Midwest", espnId: 2628, isFirstFour: true, record: "21-10" },
];
