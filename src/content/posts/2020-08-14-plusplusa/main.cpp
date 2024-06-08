#include <iostream>

int main(int argc, char * argv[]) {
  int a = 5;
  int b = ++a + a++;
  std::cout << b << std::endl;
  return 0;
}
