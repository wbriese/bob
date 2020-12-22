# Weekly assessment 3

Sections are marked as H2 (##), questions as H3 (###).
For each question please provide a brief answer below it.
You can use Markdown syntax (e.g. to include code snippets).

## Back-end frameworks


### What is the difference between Express and Koa?
KOA has ctx object to serve both request and response
KOA uses middleware functions to apply functionality; these are stored in extra npm modules and can be loaded

## Databases


### List the type of associations that data can have in a relational database, then provide an example for each one, and explain the corresponding database schema.
1:1 relationship
 e.g. date of birth and name of a person, 
both data are in same table: table person (id,name, birthday)

1:n
hobbies of a person; each person can have several hobbies.
Stored in extra table connected via foreign key:
table person
table hobbies (id, hobby,id_table_person as foreign key)

m:n
Different persons can have different hobbies; same structure as above, 
but hobby can appear several times in above table.


### What is a foreign key?
A foreign key is an identifier which connects two tables of a database.


## HTML and CSS


### Explain the different values that the "position" property can have.
position: absolute,static, flex, relative

### What are the four pillars of web components?
HtML templates
custom elements
shadow dom
html imports