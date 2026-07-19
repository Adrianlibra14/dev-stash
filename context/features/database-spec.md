# Sequelize + Neon PostgreSQL Setup

## Overview

Set up Sequelize ORM with Neon PostgreSQL database.

## Requirements

- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md (this will evolve)
- Include passport.js models
- Add appropriate indexes and cascade deletes

## References

- Initial data models: `@context/project-overview.md`
- Sequelize docs: https://sequelize.org/docs/v6/

## Notes

We will have a development branch that we work on that will be in DATABASE_URL and then we will have a production branch. So we ALWAYS create migrations and never push directly unless specified.

You can also look at the setup guide here - https://sequelize.org/docs/v6/getting-started/