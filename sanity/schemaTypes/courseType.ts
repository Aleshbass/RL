import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    {
      name: "price",
      title: "Price (₦)",
      type: "number",
      description: "Price in Naira (₦)",
      validation: (Rule) => Rule.min(0),
    },
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "reference", to: { type: "module" } }],
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      to: { type: "instructor" },
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "user", title: "User", type: "reference", to: [{ type: "student" }] },
            { name: "text", title: "Text", type: "text" },
            { name: "createdAt", title: "Created At", type: "datetime", initialValue: () => new Date().toISOString() },
          ],
        },
      ],
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "user", title: "User", type: "reference", to: [{ type: "student" }] },
            { name: "createdAt", title: "Created At", type: "datetime", initialValue: () => new Date().toISOString() },
          ],
        },
      ],
    }),
  ],
});
