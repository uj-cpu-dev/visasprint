import {
    pgTable,
    uuid,
    text,
    integer,
    boolean,
    timestamp,
    jsonb,
    date,
    real,
    unique,
  } from "drizzle-orm/pg-core";
  
  export const sponsors = pgTable("sponsors", {
    id: uuid("id").primaryKey().defaultRandom(),
    organisation: text("organisation").notNull(),
    townCity: text("town_city"),
    county: text("county"),
    route: text("route").notNull(),
    rating: text("rating"),
    normalisedName: text("normalised_name").notNull(),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
  });
  
  export const companies = pgTable("companies", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    normalisedName: text("normalised_name").notNull().unique(),
    sponsorId: uuid("sponsor_id").references(() => sponsors.id),
    sponsorMatch: text("sponsor_match"),
    sponsorConfidence: real("sponsor_confidence"),
    logoUrl: text("logo_url"),
  });
  
  export const ruleVersions = pgTable("rule_versions", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    rules: jsonb("rules").notNull(),
    sourceUrl: text("source_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  });
  
  export const jobs = pgTable(
    "jobs",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      source: text("source").notNull(),
      sourceId: text("source_id").notNull(),
      companyId: uuid("company_id")
        .notNull()
        .references(() => companies.id),
      title: text("title").notNull(),
      description: text("description").notNull(),
      location: text("location"),
      region: text("region"),
      salaryMin: integer("salary_min"),
      salaryMax: integer("salary_max"),
      salaryPeriod: text("salary_period"),
      socCode: text("soc_code"),
      applyUrl: text("apply_url").notNull(),
      postedAt: timestamp("posted_at", { withTimezone: true }),
      closesAt: timestamp("closes_at", { withTimezone: true }),
      isActive: boolean("is_active").notNull().default(true),
      dedupeHash: text("dedupe_hash").notNull(),
      rawPayload: jsonb("raw_payload").notNull(),
      eligibility: jsonb("eligibility"),
      ingestedAt: timestamp("ingested_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    },
    (t) => [unique().on(t.source, t.sourceId)],
  );

  export const ingestionRuns = pgTable("ingestion_runs", {
    id: uuid("id").primaryKey().defaultRandom(),
    source: text("source").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    status: text("status").notNull(),
    jobsFound: integer("jobs_found"),
    jobsNew: integer("jobs_new"),
    error: text("error"),
  });
  
  export const aiUsage = pgTable("ai_usage", {
    id: uuid("id").primaryKey().defaultRandom(),
    operation: text("operation").notNull(),
    model: text("model").notNull(),
    inputTokens: integer("input_tokens").notNull(),
    outputTokens: integer("output_tokens").notNull(),
    costPence: integer("cost_pence"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  });