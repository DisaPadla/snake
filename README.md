# snake

Напишите реализацию игры "Змейка", исопльзуя заготовленные движок и лейаут.

## Движок

Движок ожидает на вход матрицу (двумерный массив), состоящий из целых чисел:

```
0 0 0 0 0 0 0 0
0 1 1 1 1 0 0 0
0 0 0 0 0 0 2 0
0 2 0 0 0 0 0 0
3 3 3 3 3 3 3 3
```

Значение каждого числа:

* 0 - пустая клетка. Отображаеться, как пустая ячейка таблицы.
* 1 - тело змейки. Отображаеться в виде квадрата с закругленынми краями;
* 2 - еда для змейки. Отображаеться, как круг;
* 3 - стена. Отображаеться, как квадрат без закруглений.
