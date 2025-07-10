---
title: "Die Geschichte von OpenZFS und TrueNAS"
date: 2024-01-12T20:03:20+00:00
draft: false
authors: ["Wim Bonis"]
categories: ["- Uncategorized"]
tags: ["uncategorized"]
showHero: true
description: "Die Geschichte von OpenZFS und TrueNAS"
---
##
 Entstehung und Ziele
Das Jahr 2001 markierte die Geburtsstunde von ZFS, dem "Zettabyte File System". Entwickelt von Matthew Ahrens und Jeff Bonwick bei Sun Microsystems für das Solaris-Betriebssystem, sollte ZFS die Grenzen damaliger Dateisysteme überwinden. Mehrere Festplatten ohne zusätzliche Hardware zu verwalten, die Anzahl der Dateien ins Unendliche zu skalieren und gleichzeitig die Speicherkapazität zu maximieren – diese ambitionierten Ziele trieben die Entwicklung voran.

**ZFS bietet als skalierbares Dateisystem viele fortschrittliche Funktionen:**-
 Storage Pooling
 -
 Umfassender Schutz vor [Data Corruption]()
 -
 Hohe Speicherkapazitäten zu verarbeiten
 -
 Dateigrößen von bis zu 16 Exabyte
 -
 Poolgrößen von 256 Billiarden Zettabytes
 -
 Effiziente Inline-Datenkompression
 -
 [Copy-on-Write]() und [Snapshots]()
 -
 Kontinuierliche Integritätsprüfung und automatische Reparatur
 -
 Native [NFSv4]()–[Zugriffssteuerung]()
 -
 [RAID-Z](), das RAID-ähnliche Fähigkeiten bietet und die [Volume-Management-Fähigkeiten]() des Dateisystems ergänzt.
## OpenZFS und ZFS unter Linux: Die Geschichte einer Open-Source-Revolution
ZFS, das "Zettabyte File System", war ursprünglich ein proprietäres System von Sun Microsystems. 2005 öffnete Sun jedoch den Quellcode seines Solaris-Betriebssystems, der die ZFS-Codebasis enthielt, unter der GPL-Lizenz. OpenSolaris war geboren.
Ein paar Jahre später kaufte Oracle Sun und schloss damit den Zugang zum OpenSolaris-Code wieder. Der ZFS-Quellcode war jedoch bereits seit geraumer Zeit verfügbar. Entwickler spalteten OpenSolaris ab und führten illumos als alternatives Betriebssystem ein. Den ZFS-Teil des Codes portierten sie erfolgreich auf mehrere Open-Source-Unix-Plattformen wie FreeBSD und macOS.
Im Jahr 2013 gründete eine Gruppe von Entwicklern das OpenZFS-Projekt, um die Entwicklung zu koordinieren und die Fragmentierung des Codes zu verhindern. Durch ihre Initiative wurde ZFS in Unix-ähnlichen Systemen weit verbreitet, insbesondere unter FreeBSD.
OpenZFS und das ursprüngliche ZFS weisen aufgrund ihrer gemeinsamen Code-Basis eine starke Ähnlichkeit auf. Aufgrund dieser Ähnlichkeit wird OpenZFS oft einfach als ZFS bezeichnet. Die proprietäre Version von ZFS ist derzeit nur im Solaris-Betriebssystem verfügbar. Alle anderen Plattformen nutzen entweder OpenZFS oder ZFS on Linux (ZoL), eine Portierung von OpenZFS für Linux, die erstmals im Jahr 2013 veröffentlicht wurde. Aus diesem Grund werden ZoF (ZFS on FreeBSD) und ZoL unter Open-Source-Enthusiasten üblicherweise auch als ZFS bezeichnet.
## ZFS unter Linux: Einigung auf OpenZFS
Lange Zeit war ZFS on FreeBSD (ZoF) der führende Open-Source-Zweig von ZFS. Die Stabilität und Reife des FreeBSD-Betriebssystems sowie die aktive Community von ZoF-Entwicklern trugen zu dieser Dominanz bei. Mit der wachsenden Popularität von Linux und seiner größeren Benutzer- und Entwicklerbasis änderte sich jedoch das Blatt. ZFS on Linux (ZoL) entwickelte sich rasant weiter und holte in puncto Funktionsumfang und Performance schnell zu ZoF auf. Ein wesentlicher Unterschied zwischen ZoF und ZoL lag in der Entwicklungsphilosophie. Die ZoF-Entwickler fokussierten sich auf die langfristige Stabilität des Dateisystems und integrierten neue Funktionen daher eher zurückhaltend. ZoL hingegen war agiler und experimentierfreudiger, was zu einer schnelleren Integration neuer Features führte. Im Jahr 2019 war ZoL für viele führende Linux-Distributionen verfügbar. Ein Meilenstein war die Veröffentlichung von Ubuntu 20.04 LTS im Jahr 2020, die ZFS als Root-Dateisystem für das Betriebssystem nutzte. Dies trug zur weiteren Verbreitung von ZoL bei.
Im Dezember 2020, mit der Veröffentlichung von OpenZFS 2.0.0, kam es zur Fusion von ZoF und ZoL. Dieser Schritt beendete die jahrelange Trennung der beiden Zweige und führte zu einer Vereinheitlichung der ZFS-Entwicklung unter Linux.
## FreeNAS: Das Open-Source Betriebssystem
Das FreeNAS-Projekt wurde 2005 von iXsystems ins Leben gerufen. Ursprünglich basierte es auf einer Linux-Mikrodistribution, bot aber nur rudimentäre Funktionen und war ausschließlich für erfahrene Nutzer zugänglich. Im Jahr 2010 entschieden sich die Entwickler für einen Neustart mit FreeBSD als Basis. Diese Wahl versprach mehr Stabilität und den Zugang zum fortschrittlichen ZFS-Dateisystem.ZFS bot zwar enorme Vorteile, war aber zu diesem Zeitpunkt noch rein kommandozeilenbasiert. Dies schränkte die Nutzerbasis stark ein und schloss viele potenzielle Anwender aus. Um die Hürden zu senken und FreeNAS einem breiteren Publikum zugänglich zu machen, entwickelten die Verantwortlichen eine benutzerfreundliche Web-GUI. Diese grafische Oberfläche ermöglichte die komfortable Konfiguration und Verwaltung des NAS-Systems auch ohne tiefgreifende Unix-Kenntnisse. iXsystems bot in der Vergangenheit zwei Versionen von FreeNAS an: TrueNAS als kostenpflichtige Enterprise-Lösung und FreeNAS als kostenlose Open-Source-Variante. Beide basierten auf separaten Codebasen und verwendeten unterschiedliche Installations-Images.
## TrueNAS CORE
Im März 2020 fasste iXsystems, die Firma hinter FreeNAS, die beiden NAS-Lösungen FreeNAS und TrueNAS unter dem Namen TrueNAS zusammen.

**Drei Versionen für jeden Bedarf:**-**TrueNAS CORE:**Die kostenlose Open-Source-Version mit vollem Funktionsumfang und ohne Kapazitätsbegrenzung. Ideal für Privatanwender und kleine Unternehmen.
 -**TrueNAS Enterprise:**Die kommerzielle Lösung mit erweitertem Funktionsumfang, Support und Hardware-Bundle. Perfekt für Unternehmen mit hohen Anforderungen.
 -**TrueNAS SCALE:**Die Open-Source-Lösung für die Linux-Welt, die die bewährte Qualität von OpenZFS mit besserer Virtualisierung und Containerinfrastruktur verbindet.
TrueNAS CORE ist der direkte Nachfolger von FreeNAS. Es nutzt die gleiche bewährte Software, die bereits bei Hunderttausenden von Anwendern im Einsatz ist und das Vertrauen vieler IT-Experten gewonnen hat. Richtig konfiguriert bietet TrueNAS ein robustes und sicheres Speicher-Backend für viele Anwendungen – vom SOHO-Bereich bis hin zu Multi-Terabyte-Unternehmenspools. TrueNAS stellt stets die neueste Version von OpenZFS mit den aktuellsten Funktionen, Updates und Patches zur Verfügung.
TrueNAS unterstützt Windows-, macOS- und Unix-Clients sowie verschiedene Virtualisierungshosts wie XenServer und VMware. Nutzer profitieren von einer breiten Palette an Protokollen wie SMB, AFP, NFS, iSCSI, SSH, rsync und FTP/TFTP.
## Auswirkungen der TrueNAS-Konsolidierung auf Anwender
Als Neueinsteiger in die Welt von ZFS bietet TrueNAS CORE die perfekte Plattform, um die Vorteile dieses innovativen Dateisystems zu erleben. Mit einer einheitlichen und stets aktuellen Softwareumgebung, inklusive OpenZFS, Samba, NFS, iSCSI und weiteren essentiellen Tools, ist TrueNAS CORE der ideale Einstiegspunkt für alle, die ihre Daten sicher und effizient speichern möchten. Dank der kontinuierlichen Weiterentwicklung von TrueNAS CORE profitieren Anwender stets von den aktuellsten Funktionen, Leistungs- und Sicherheitsupdates von ZFS.
Nutzer können sich auf die bewährte Stabilität und Robustheit von OpenZFS verlassen. Selbst bei einem Ausfall eines Controllers bewahrt ZFS Ihre Datenintegrität. Sie können Ihren ZFS-Pool einfach auf einem beliebigen System einbinden und so Ihre Daten mühelos wiederherstellen.