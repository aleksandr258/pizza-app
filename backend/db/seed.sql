TRUNCATE TABLE products RESTART IDENTITY CASCADE;

INSERT INTO products (name, price, ingredients, image, rating) VALUES
  ('Пепперони', 549, ARRAY['пепперони', 'моцарелла', 'томатный соус'], '/products/pepperoni.jpg', 4.8),
  ('Маргарита', 429, ARRAY['моцарелла', 'томаты', 'базилик'], '/products/margherita.jpg', 4.6),
  ('Оливковая', 469, ARRAY['оливки', 'моцарелла', 'томатный соус', 'орегано'], '/products/olive.jpg', 4.5),
  ('Четыре сыра', 599, ARRAY['моцарелла', 'пармезан', 'дор блю', 'чеддер'], '/products/four-cheese.jpg', 4.9),
  ('Гавайская', 519, ARRAY['курица', 'ананас', 'моцарелла'], '/products/hawaiian.jpg', 4.2),
  ('Мясная', 649, ARRAY['говядина', 'бекон', 'колбаски', 'моцарелла'], '/products/meat.jpg', 4.7);
