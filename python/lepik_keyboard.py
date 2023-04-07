import keyboard


def keyTap(key: str) -> None:
    keyboard.send(key)


def write(arr: tuple, delay: int) -> None:
    string = ' '.join(str(x) for x in arr)
    keyboard.write(string, delay=delay)


def copy():
    keyboard.press_and_release("ctrl+c")


def paste():
    keyboard.press_and_release("ctrl+v")
