export {};
declare global {
  type Car = {
    createdAt: string;
    name: string;
    image: string;
    price: string;
    description: string;
    model: string;
    brand: string;
    id: string;
  };

  type Cars = Array<Car>;

  type ApiResponse = Array<Car>;

  interface IMyKnownError {
    message: string;
    file: string;
    line: number;
  }

  type SortType =
    | "old-to-new"
    | "new-to-old"
    | "price-hight-to-low"
    | "price-low-to-hight";
}
