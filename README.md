## Process Completing Mission 1 2 3

### Mission 1
1. daterangepicker, input for date range display, input with calendar icon, input group with button.
2. get data, datedisplay, date format according to date difference.
3. display archiver logo when result is zero.
4. display of ellipsis / truncate in the table view.
5. handling different media of displaying the search result.
6. highlight on the column when the header is activated / clicked.
7. sorting array of email object according to header key.

### Mission 2

#### UI for display email details

header | content(n) | row click
------ | ---------- | ---------
subject | sender's email, receiver's email(hide at first place), attachment icon + datetime display on right, email body, (opt)attachments list at the bottom | show and hide the ...rest of the content(n)
1. popup/modal for easy access and close of email's detail.
2. modal body
3. taking care for n correspondences of a subject. same UX UI repeated.


#### working files including:
* ~~src/assets~~
* /Backdrop
* /Modal
* Utils.js, datas.js, App.js, App.css
- REPORT.md, IMPROVEMENTS.md


## Improvements
- [ ] don't a complete system need navigation menu at least on it?
- [ ] add `sender name`, `receiver name` next to their email.
- [ ] confusion of badge purpose. `badge`+n, if it means the total times of communication on the same subject, `+` sign should be ommited, as the plus may indicate new or unread emails.
- [ ] Clicking on the Header allow sorting, the **icon** of `asc` and `desc` need to be interchangable.
- [ ] have pagination if the result is more than a certain number.
- [ ] **Search function expansion**: search by `has attachment`, `keywords`, `sender`, `receiver`, single and multiple conditions filtering.
- [ ] for archive purpose, suggest to add in email **categorize ability**. 
- [ ] improvements in mobile view on **readability**, Maybe simple row stripes difference may help.
- [ ] improvements on **accessibility**, especially on the search function, the main functions --> datepicker, and the search results.
- [ ] add a user's choice or predefined **colour theme** for the system including buttons, background, table, header, list, etc