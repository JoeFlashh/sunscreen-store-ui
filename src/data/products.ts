// default image
import blueImg from "../assets/images/blue.png";
import goldImg from "../assets/images/gold.png";
import grayImg from "../assets/images/gray.png";
import pinkImg from "../assets/images/pink.png";
import purpleImg from "../assets/images/purple.png";
import tealImg from "../assets/images/teal.png";
import whiteImg from "../assets/images/white.png";
import yellowImg from "../assets/images/yellow.png";

// hover image
import blueHoverImg from "../assets/images/blueHoverImg.png";
import goldHoverImg from "../assets/images/goldHoverImg.png";
import grayHoverImg from "../assets/images/grayHoverImg.png";
import pinkHoverImg from "../assets/images/pinkHoverImg.png";
import purpleHoverImg from "../assets/images/purpleHoverImg.png";
import tealHoverImg from "../assets/images/tealHoverImg.png";
import whiteHoverImg from "../assets/images/whiteHoverImg.png";
import yellowHoverImg from "../assets/images/yellowHoverImg.png";

export interface Product {
  id: number;
  name: string;
  type: string;
  spf: number;
  reefSafe: boolean;
  price: number;
  defaultImage: string;
  hoverImage: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "O'ahu Sand Mineral SPF 50",
    type: "mineral",
    spf: 50,
    reefSafe: true,
    price: 18.99,
    defaultImage: yellowImg,
    hoverImage: yellowHoverImg,
  },
  {
    id: 2,
    name: "Tide turner Chemical SPF 30",
    type: "chemical",
    spf: 30,
    reefSafe: false,
    price: 12.49,
    defaultImage: grayImg,
    hoverImage: grayHoverImg,
  },
  {
    id: 3,
    name: "Ocean Breeze Mineral SPF 30",
    type: "mineral",
    spf: 30,
    reefSafe: true,
    price: 15.0,

    defaultImage: whiteImg,
    hoverImage: whiteHoverImg,
  },
  {
    id: 4,
    name: "Soft Sands Chemical SPF 50",
    type: "chemical",
    spf: 50,
    reefSafe: true,
    price: 17.75,
    defaultImage: purpleImg,
    hoverImage: purpleHoverImg,
  },
  {
    id: 5,
    name: "Turtle Bay Mineral SPF 50",
    type: "mineral",
    spf: 50,
    reefSafe: true,
    price: 19.99,
    defaultImage: tealImg,
    hoverImage: tealHoverImg,
  },
  {
    id: 6,
    name: "Beach Bliss Chemical SPF 50",
    type: "chemical",
    spf: 50,
    reefSafe: false,
    price: 14.5,
    defaultImage: pinkImg,
    hoverImage: pinkHoverImg,
  },
  {
    id: 7,
    name: "Indo Blues Mineral SPF 30",
    type: "mineral",
    spf: 30,
    reefSafe: true,
    price: 16.25,
    defaultImage: blueImg,
    hoverImage: blueHoverImg,
  },
  {
    id: 8,
    name: "Sunny Days Chemical SPF 30",
    type: "chemical",
    spf: 30,
    reefSafe: false,
    price: 13.75,
    defaultImage: goldImg,
    hoverImage: goldHoverImg,
  },
];

export default products;
