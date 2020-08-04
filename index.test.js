const {
  stringCase,
  CamelCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  UpperCase,
  LowerCase
} = require("./index");

describe("StringCase", () => {
  test.each([
    [
      "helloWorld",
      CamelCase,
      {
        camel: "helloWorld",
        pascal: "HelloWorld",
        snake: "hello_world",
        kebab: "hello-world"
      }
    ],
    [
      "HelloWorld",
      PascalCase,
      {
        camel: "helloWorld",
        pascal: "HelloWorld",
        snake: "hello_world",
        kebab: "hello-world"
      }
    ],
    [
      "hello-world",
      KebabCase,
      {
        camel: "helloWorld",
        pascal: "HelloWorld",
        snake: "hello_world",
        kebab: "hello-world"
      }
    ],
    [
      "hello_world",
      SnakeCase,
      {
        camel: "helloWorld",
        pascal: "HelloWorld",
        snake: "hello_world",
        kebab: "hello-world"
      }
    ],
    [
      "HELLOWORLD",
      UpperCase,
      {
        camel: "HELLOWORLD",
        pascal: "HELLOWORLD",
        snake: "HELLOWORLD",
        kebab: "HELLOWORLD"
      }
    ],
    [
      "helloworld",
      LowerCase,
      {
        camel: "helloworld",
        pascal: "helloworld",
        snake: "helloworld",
        kebab: "helloworld"
      }
    ],
    [
      "CREATED AT.",
      CamelCase,
      {
        camel: "createdAT",
        pascal: "CreatedAT",
        snake: "created_at",
        kebab: "created-at"
      }
    ],
    [
      "User. ID",
      PascalCase,
      {
        camel: "userID",
        pascal: "UserID",
        snake: "user_id",
        kebab: "user-id"
      }
    ],
    [
      "User. Id",
      PascalCase,
      {
        camel: "userId",
        pascal: "UserId",
        snake: "user_id",
        kebab: "user-id"
      }
    ],
    [
      "User. 100",
      PascalCase,
      {
        camel: "user100",
        pascal: "User100",
        snake: "user_100",
        kebab: "user-100"
      }
    ],
    [
      "User. AB100",
      PascalCase,
      {
        camel: "userAB100",
        pascal: "UserAB100",
        snake: "user_ab100",
        kebab: "user-ab100"
      }
    ],
    [
      "john. DOE",
      CamelCase,
      {
        camel: "johnDOE",
        pascal: "JohnDOE",
        snake: "john_doe",
        kebab: "john-doe"
      }
    ],
    [
      "the Amazing Spider-Man",
      KebabCase,
      {
        camel: "theAmazingSpiderMan",
        pascal: "TheAmazingSpiderMan",
        snake: "the_amazing_spider_man",
        kebab: "the-amazing-spider-man"
      }
    ]
  ])('stringCase("%s") returns %p %p', (str, ClassInstance, expected) => {
    const instance = stringCase(str);
    expect(instance).toBeInstanceOf(ClassInstance);
    expect(instance.camel).toEqual(expected.camel);
    expect(instance.pascal).toEqual(expected.pascal);
    expect(instance.kebab).toEqual(expected.kebab);
    expect(instance.snake).toEqual(expected.snake);
  });
});
