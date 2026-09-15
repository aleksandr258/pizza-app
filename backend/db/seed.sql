TRUNCATE TABLE products RESTART IDENTITY CASCADE;

INSERT INTO products (name, price, ingredients, image, rating) VALUES
  ('Пепперони', 549, ARRAY['пепперони', 'моцарелла', 'томатный соус'], '/products/pepperoni.svg', 4.8),
  ('Маргарита', 429, ARRAY['моцарелла', 'томаты', 'базилик'], '/products/margherita.svg', 4.6),
  ('Оливковая', 469, ARRAY['оливки', 'моцарелла', 'томатный соус', 'орегано'], '/products/olive.svg', 4.5),
  ('Четыре сыра', 599, ARRAY['моцарелла', 'пармезан', 'дор блю', 'чеддер'], '/products/four-cheese.svg', 4.9),
  ('Гавайская', 519, ARRAY['курица', 'ананас', 'моцарелла'], '/products/hawaiian.svg', 4.2),
  ('Мясная', 649, ARRAY['говядина', 'бекон', 'колбаски', 'моцарелла'], '/products/meat.svg', 4.7);
