
const db = require("./db");

db.task("create database", async (t) => {
  // create users table
  await t.none(`
    CREATE TABLE users
    (
      id uuid NOT NULL,
      username character varying UNIQUE NOT NULL,
      password character varying NOT NULL,
      email character varying NOT NULL,
      PRIMARY KEY (id)
    );
    `);
  // create subzeddits table
  await t.none(`
    CREATE TABLE subzeddits
    (
      id uuid NOT NULL,
      title character varying NOT NULL,
      creator uuid NOT NULL,
      creation_date date NOT NULL,
      subscriptions bigint DEFAULT 0,
      description character varying,
      posts_count bigint DEFAULT 0,
      PRIMARY KEY (id),
      CONSTRAINT "User creator" FOREIGN KEY (creator)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
    );
    `);
  // create posts table
  await t.none(`
    CREATE TABLE posts
    (
      id uuid NOT NULL,
      title character varying NOT NULL,
      creator uuid NOT NULL,
      creation_date timestamp with time zone NOT NULL,
      content character varying,
      subzeddit uuid NOT NULL,
      comments_num integer DEFAULT 0,
      upvotes integer DEFAULT 0,
      downvotes integer DEFAULT 0,
      filename character varying,
      type character varying,
      updated boolean DEFAULT false,
      comments bigint DEFAULT 0,
      updated_time timestamp with time zone,
      PRIMARY KEY (id),
      CONSTRAINT "User creator" FOREIGN KEY (creator)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
      CONSTRAINT "Parent subzeddit" FOREIGN KEY (subzeddit)
        REFERENCES subzeddits (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
    `);
  // create comments table  
  await t.none(`
    CREATE TABLE comments
    (
      id uuid NOT NULL,
      author uuid,
      content character varying,
      creation_time timestamp with time zone,
      parent_post uuid NOT NULL,
      parent_comment uuid DEFAULT null,
      level integer DEFAULT 1,
      upvotes integer DEFAULT 0,
      downvotes integer DEFAULT 0,
      updated boolean DEFAULT false,
      deleted boolean DEFAULT false,
      updated_time timestamp with time zone,
      PRIMARY KEY (id),
      CONSTRAINT "Comment author" FOREIGN KEY (author)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
      CONSTRAINT "Parent post" FOREIGN KEY (parent_post)
        REFERENCES posts (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Parent comment" FOREIGN KEY (parent_comment)
        REFERENCES comments (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
    `);
  // create table for subzeddits subscriptions
  await t.none(`
    CREATE TABLE subzeddit_subscriptions
    (
      id uuid NOT NULL,
      subscriber uuid,
      subzeddit uuid,
      PRIMARY KEY (id),
      CONSTRAINT "Subscribed user" FOREIGN KEY (subscriber)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Subscribed subzeddit" FOREIGN KEY (subzeddit)
        REFERENCES subzeddits (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
    `);
  // create table for posts ratings
  await t.none(`
    CREATE TABLE posts_rating
    (
      id uuid NOT NULL,
      user_id uuid,
      post uuid,
      rating integer,
      PRIMARY KEY (id),
      CONSTRAINT "User id" FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Post id" FOREIGN KEY (post)
        REFERENCES posts (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Rating value" CHECK (rating IN (-1, 1))
    );
    `);
  // create table for comments ratings
  await t.none(`
    CREATE TABLE comments_rating
    (
      id uuid NOT NULL,
      user_id uuid NOT NULL,
      comment uuid NOT NULL,
      rating integer,
      PRIMARY KEY (id),
      CONSTRAINT "User author" FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Comment rated" FOREIGN KEY (comment)
        REFERENCES comments (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
      CONSTRAINT "Rating values" CHECK (rating IN (-1, 1))
    );
    `);
})
  .then(() => {
    console.log("success");
  })
  .catch((error) => {
    console.log("tables creation error");
    console.log(error);
  });