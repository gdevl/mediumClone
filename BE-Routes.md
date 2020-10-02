# Back-End Routes

* Users
  * /follow POST (follow)
  * /follow DELETE (unfollow)
  * POST /register, create a new user
  * GET /users/3/stories/, get all stories authored by user with id 3
  * GET /users/3/claps, get all claps for user with id 3
  * GET /users/3/responses, get all responses for user with id 3
  * GET /users/token, authentication route, token generation
* Stories
  * GET /stories, get a list of the stories
  * POST /stories, create a new story
  * GET /stories/18, get the single story with id 18 include all responses
  * PUT /stories/18, update the story with id 18
  * DELETE /stories/18, delete the story with id 18
* Responses
  * GET /responses/3, get the single response with id 3
  * PUT /responses/3, update the response with id 3
  * DELETE /responses/3/, delete the response with id 3
  * POST /stories/18/responses, create a new response for story 18
* ResponseClaps
  * POST /responses/3/clap, creates a clap for response with id 3 (limit 1)
  * DELETE /responses/3/clap, removes the clap from response with id 3
* StoryClaps
  * POST /stories/3/clap, create a new clap on story with id 3
  * DELETE /stories/3/clap, removes clap from story with id 3
