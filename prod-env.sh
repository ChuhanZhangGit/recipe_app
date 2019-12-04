#!/bin/sh

export MIX_ENV=prod
export PORT=4800
export DATABASE_URL="ecto://lenrecipe_apps:some_pass@localhost/recipe_app_prod"
export SECRET_KEY_BASE="some_long_secret"