import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT
        r.recipe_id,
        r.name AS recipe_name,
        r.image AS recipe_image,
        r.recipe_type,
        r.created_at,
        r.updated_at,
        u.user_id AS author_id,
        u.username AS author_username,
        u.first_name AS author_first_name,
        u.last_name AS author_last_name,
        COUNT(DISTINCT lr.like_id) AS like_count,
        AVG(rt.rating) AS average_rating,
        json_agg(json_build_object(
            'step_id', s.step_id,
            'step_number', s.step_number,
            'description', s.description
        ) ORDER BY s.step_number) AS steps,
        json_agg(json_build_object(
            'rating_id', rt.rating_id,
            'rater_id', rt.rater_id,
            'rating', rt.rating,
            'description', rt.description,
            'created_at', rt.created_at
        ) ORDER BY rt.created_at) AS ratings
    FROM recipes r
    JOIN users u ON r.author_id = u.user_id
    LEFT JOIN ratings rt ON r.recipe_id = rt.rated_id
    LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_id
    LEFT JOIN steps s ON r.recipe_id = s.recipe_id
    GROUP BY
        r.recipe_id,
        r.name,
        r.image,
        r.recipe_type,
        r.created_at,
        r.updated_at,
        u.user_id,
        u.username,
        u.first_name,
        u.last_name;
  `,
})
export class OneRecipeView {
  @ViewColumn()
  recipe_id: number;

  @ViewColumn()
  recipe_name: string;

  @ViewColumn()
  recipe_image: string;

  @ViewColumn()
  recipe_type: string;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  updated_at: Date;

  @ViewColumn()
  author_id: number;

  @ViewColumn()
  author_username: string;

  @ViewColumn()
  author_first_name: string;

  @ViewColumn()
  author_last_name: string;

  @ViewColumn()
  like_count: number;

  @ViewColumn()
  average_rating: number;

  @ViewColumn()
  steps: object[];

  @ViewColumn()
  ratings: object[];
}
