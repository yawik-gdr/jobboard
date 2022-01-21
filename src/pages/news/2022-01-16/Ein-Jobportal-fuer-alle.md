---
title: Ein Jobportal for alle
desc: Ein Portal für Arbeitnehmer und Arbeitgeber, ist klar. Aber eins für Software Entwickler? Damit kann man sich viel Arbeit sparen und das Leben wird leichter.
cat: In eigener Sache
date: 2022-01-16
image: https://images.unsplash.com/photo-1584921466621-d3a283cd3744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2xvZ2FufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60
---


# Ein Jobportal for alle

Man kann jetzt ab sofort Stellenanzeigen per Formular auf Google Jobs schalten. Und soweit mir bekannt, ist es das erste Formular ohne Abhängigkeiten. Das Formular braucht nur einen Browser. Es braucht keine Datenbank und kein Content Management System. Es funktioniert einfach so.

Aber man kann natürlich auch eine Datenbank und ein beliebiges CMS nutzen, um eine Liste mit offenen Stellenanzeigen zu integrieren.

Das Formular gibt’s unter https://jobwizard.yawik.org. Am besten ausprobieren.

Es folgen technische Details:

* verwendet wird der jamstack
* Das Eingabeformular läuft 100% im Browser. Kein externer Server notwendig.
* Als Backend läuft Strapi.
* Alles Open Source. Kann von der eigenen IT integriert werden