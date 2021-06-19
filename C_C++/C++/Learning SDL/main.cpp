#include <iostream>
#include <random>
#include <SDL.h>

constexpr int window_width = 1000;
constexpr int window_height = 1000;
constexpr int cell_size = 4;
constexpr int fps = 128;

using namespace std;

int main(int argc, char** args) {

	SDL_Init(SDL_INIT_EVERYTHING);

	SDL_Window* window;
	SDL_Surface* screen;

	// initialize random gen
	std::random_device rd; // obtain a random number from hardware
	std::mt19937 gen(rd()); // seed the generator
	std::uniform_int_distribution<> distr(-4, 3); // define the range

	// initialize the window
	window = SDL_CreateWindow("Window",
		SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED,   // posX, posY (undefined = default)
		window_width, window_height, 						// width, height
		0);

	// initialize the window's screen
	screen = SDL_GetWindowSurface(window);

	Uint32 white = SDL_MapRGB(screen->format, 255, 255, 255);
	SDL_FillRect(screen, NULL, white);
	SDL_UpdateWindowSurface(window);

	// initialize the grid of cells to all be off
	const int grid_w = (window_width / cell_size) + 2;
	const int grid_h = (window_height / cell_size) + 2;
	int grid[grid_w][grid_h];
	int new_grid[grid_w][grid_h];

	for (int x = 0; x < grid_w; x++) {
		for (int y = 0; y < grid_h; y++) {

			grid[x][y] = 0;

		}
	}

	// randomly turn on half of the cells IN THE WINDOW (ignore the outer edge - they are only used in neighbor calculations)
	for (int x = 1; x < grid_w - 1; x++) {
		for (int y = 1; y < grid_h - 1; y++) {
			grid[x][y] = std::max(distr(gen), 0);

		}

	}

	// main event loop
	SDL_Event event;      // track events (quit, resize, etc)
	bool running = true;

	while (running) { // main loop

		// note down the time at the start of the frame
		Uint32 starting_tick = SDL_GetTicks();

		// event management
		while (SDL_PollEvent(&event)) {

			if (event.type == SDL_QUIT) { // quit event
				running = false;
				break;
			}

		}

		// update the cells
		for (int x = 1; x < grid_w - 1; x++) {
			for (int y = 1; y < grid_h - 1; y++) {

				int c_type = grid[x][y];

				int neighbors[4] = { 0, 0, 0, 0 };

				neighbors[grid[x + 1][y + 1]] ++;
				neighbors[grid[x + 1][y    ]] ++;
				neighbors[grid[x + 1][y - 1]] ++;
				neighbors[grid[x    ][y + 1]] ++;
				neighbors[grid[x    ][y - 1]] ++;
				neighbors[grid[x - 1][y + 1]] ++;
				neighbors[grid[x - 1][y    ]] ++;
				neighbors[grid[x - 1][y - 1]] ++;

				new_grid[x][y] = grid[x][y];

				int n_count = neighbors[1] + neighbors[2] + neighbors[3];
				if (c_type == 0) {

					if (n_count == 3) {

						if (neighbors[1] > 1)      { new_grid[x][y] = 1; }
						else if (neighbors[2] > 1) { new_grid[x][y] = 2; }
						else                       { new_grid[x][y] = 3; }

					}

				}
				else {

					if (n_count < 2) { new_grid[x][y] = 0; }
					if (n_count > 3) { new_grid[x][y] = 0; }

				}

				/*
				if (neighbors <  2) { new_grid[x][y] = 0; }
				if (neighbors >  3) { new_grid[x][y] = 0; }
				if (neighbors == 2) { new_grid[x][y] = 1; }
				*/

			}
		}

		// update the grid in one batch
		for (int x = 1; x < grid_w - 1; x++) {
			for (int y = 1; y < grid_h - 1; y++) {
				grid[x][y] = new_grid[x][y];
			}
		}

		// render the grid
		for (int x = 1; x < grid_w - 1; x++) {
			for (int y = 1; y < grid_h - 1; y++) {

				int g_val = grid[x][y];

				SDL_Rect rect;
				rect.x = (x - 1) * cell_size;
				rect.y = (y - 1) * cell_size;
				rect.w = cell_size;
				rect.h = cell_size;

				if (g_val == 0) { 
					Uint32 color = SDL_MapRGB(screen->format, 0, 0, 0);  
					SDL_FillRect(screen, &rect, color);
				} else if (g_val == 1) { 
					Uint32 color = SDL_MapRGB(screen->format, 255, 120, 120);
					SDL_FillRect(screen, &rect, color);
				} else if (g_val == 2) { 
					Uint32 color = SDL_MapRGB(screen->format, 100, 240, 100);
					SDL_FillRect(screen, &rect, color);
				} else if (g_val == 3) {
					Uint32 color = SDL_MapRGB(screen->format, 120, 120, 255);
					SDL_FillRect(screen, &rect, color);
				}
				else {
					cout << grid[x][y];
				}

			}
		}

		// render the changes to the screen
		SDL_UpdateWindowSurface(window);

		// delay at the end of the frame until [1000 / fps] milis have passed
		Uint32 time_delta = SDL_GetTicks() - starting_tick;
		if (1000 / fps > time_delta) {
			SDL_Delay((1000 / fps) - time_delta);
		}

	}

	SDL_Quit();
	return 0;

}