defmodule RecipeApp.GetRecipesBulkApi do
  use HTTPoison.Base

  alias RecipeApp.GetRecipeApi

  @apiKey "bade8991b27847e2ae7bb94267b2c229"
  @getRecipeBulkUrl "https://api.spoonacular.com/recipes/informationBulk?"

  def getRecipesBulk(ids) do
    IO.inspect ids
    params = validateParams(ids)
    url = @getRecipeBulkUrl <> URI.encode_query(params)
    url = url <> "&ids=" <> ids
    IO.inspect url

    response = HTTPoison.get!(URI.encode(url))
    #IO.inspect response

    # TODO eror handling when status code != 200
    recipeList = Poison.decode!(response.body)
    #IO.puts("request")
    #IO.inspect recipeList

    recipeMap = Enum.reduce(recipeList, Map.new(), fn recipe, acc ->
      parsedRecipe = GetRecipeApi.parseResponse(recipe)
      acc = Map.put(acc, to_string(parsedRecipe[:recipe_id]), parsedRecipe)
    end)

    #IO.puts("recipeMap")
    #IO.inspect recipeMap

    recipeMap
  end

  def validateParams(_ids) do
    params = Map.new()
    Map.put(params, "apiKey", @apiKey)
    |> Map.put("includeNutrition", true)
    # |> Map.put("ids", ids) # will encode commas
  end


  def testBulkApi() do
    #ids = "525578,548450,613283,694949,715538,716429"
    ids = "525578,548450"
    getRecipesBulk(ids)
  end

end
