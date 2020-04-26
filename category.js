const SALARY = "월급";
const SUPPLEMENT = "부수입";
const POCKET = "용돈";
const BONUS = "상여";
const FINANCIAL = "금융소득";
const ETC = "기타";

const FOOD_OUT = "식비";
const FOOD = "식료품";
const SNACK = "간식";
const EATOUT = "외식";
const BEVERAGE = "음료";

const TRAFFIC = "교통/차량";
const PUBLIC_TRANSPORT = "대중교통";
const TAXI = "택시";
const GAS = "주유";
const REPAIR = "정비";
const RENT = "렌트";

const CULTURE = "문화생활";
const MOVIE = "영화";
const CONCERT = "공연";
const MUSIC = "음악";
const BOOK = "도서";
const APP = "어플";
const TRAVEL = "여행";
const HOBBY = "취미";

const MART = "마트";

const CONVENIENCE = "편의점";

const FASHION = "패션";
const CLOTHES = "의류";
const WASHING = "세탁";

const BEAUTY = "미용";
const HAIR = "헤어";
const COSMETICS = "화장품";

const DAILYSUPPLIES = "생활용품";
const FURNITURE = "가구";
const APPLIANCE = "가전";
const KITCHEN = "주방";
const BATHROOM = "욕실";
const GENERAL = "잡화";

const RESIDENCE = "주거/통신";
const ADMIN_COST = "관리비";
const UTILITY = "공과금";
const COMMUNICATION = "통신비";
const MONTHLY_COST = "월세";

const HEALTH = "건강";
const EXERCISE = "운동";
const DIET = "다이어트";
const HOSPITAL = "병원";
const PHARMACY = "약국";

const EDUCATION = "교육";
const SCHOOL = "학비";
const ACADEMY = "학원비";
const TEXTBOOK = "교재비";

const OCCASION = "경조사/회비";
const PRESENT = "선물";

const DEPOSIT = "저축";

const PARENT = "부모님";

const category = {
  income: {
    salary: SALARY,
    supplement: SUPPLEMENT,
    pocket: POCKET,
    bonus: BONUS,
    financial: FINANCIAL,
    etc: ETC,
  },
  spend: {
    foodOut: {
      p: FOOD_OUT,
      c: { food: FOOD, snack: SNACK, eatout: EATOUT, beverage: BEVERAGE },
    },
    traffic: {
      p: TRAFFIC,
      c: {
        publicTransport: PUBLIC_TRANSPORT,
        taxi: TAXI,
        gas: GAS,
        repair: REPAIR,
        rent: RENT,
      },
    },
    culture: {
      p: CULTURE,
      c: {
        movie: MOVIE,
        concert: CONCERT,
        music: MUSIC,
        book: BOOK,
        app: APP,
        travel: TRAVEL,
        hobby: HOBBY,
      },
    },
    mart: { p: MART },
    convenience: { p: CONVENIENCE },
    fashion: {
      p: FASHION,
      c: { clothes: CLOTHES, washing: WASHING },
    },
    beauty: { p: BEAUTY, c: { hair: HAIR, cosmetics: COSMETICS } },
    dailySupplies: {
      p: DAILYSUPPLIES,
      c: {
        furniture: FURNITURE,
        appliance: APPLIANCE,
        kitchen: KITCHEN,
        bathroom: BATHROOM,
        general: GENERAL,
      },
    },
    residence: {
      p: RESIDENCE,
      c: {
        adminCost: ADMIN_COST,
        utility: UTILITY,
        communication: COMMUNICATION,
        monthlyCost: MONTHLY_COST,
      },
    },
    health: {
      p: HEALTH,
      c: {
        exercise: EXERCISE,
        diet: DIET,
        hospital: HOSPITAL,
        pharmacy: PHARMACY,
      },
    },
    education: {
      p: EDUCATION,
      c: { school: SCHOOL, academy: ACADEMY, textbook: TEXTBOOK },
    },
    occasion: { p: OCCASION, c: { present: PRESENT } },
    deposit: { p: DEPOSIT },
    parent: { p: PARENT },
    etc: { p: ETC },
  },
};

export default category;
