let request = require("supertest");
let http = require("http");
let { getAllGames } = require("../controllers");
let { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("GET /games should get all games", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 3: Test Retrieve All Games.
  it("GET /games should get all games", async () => {
    getAllGames.mockReturnValue([
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ]);

    let result = await request(server).get("/games");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    });
  });

  //Exercise 4: Test Retrieve Game by ID.
  it("GET /games/details/:id should get an movie by ID", async () => {
    let result = await request(server).get("/games/details/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});

describe("Controller Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Games Function
  it("should return all games", () => {
    let mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);
    let result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
  });
});
