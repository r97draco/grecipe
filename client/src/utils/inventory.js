import foodByName from "../data/foodByName.json";

export const getFooDBItem = (fooDBKey) => {
  if (foodByName.hasOwnProperty(fooDBKey)) {
    return foodByName[fooDBKey];
  }

  return {};
};

export const getFoodOptions = () => {
  const uniqueFoodByName = {};

  for (const food of Object.values(foodByName)) {
    if (!uniqueFoodByName.hasOwnProperty(food.name)) {
      uniqueFoodByName[food.name] = food;
    }
  }

  return Object.values(uniqueFoodByName).map(({ name }) => ({
    value: name,
    label: name,
  }));
};
