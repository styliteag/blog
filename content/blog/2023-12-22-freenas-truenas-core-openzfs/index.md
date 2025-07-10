---
title: "FreeNAS, TrueNAS CORE und OpenZFS"
date: 2023-12-22T09:13:17+00:00
draft: false
authors: ["Wim Bonis"]
categories: ["- Datenspeicher-Lösung"]
tags: ["datenspeicher l sung"]
showHero: true
description: "FreeNAS, TrueNAS CORE und OpenZFS"
---
## Block- und Dateifreigabe**FreeNAS**,**TrueNAS**und**OpenZFS**sind Open-Source-NAS-Lösungen, die für ihre Flexibilität, Leistung und Sicherheit bekannt sind. Neben der Möglichkeit, Daten zentral zu speichern, bieten sie auch verschiedene Optionen zur Freigabe dieser Daten im Netzwerk.

**Blockfreigabe**ermöglicht den blockbasierten Zugriff auf Speichergeräte, was ideal für die Verwendung mit virtuellen Maschinen (VMs) ist.**iSCSI**,**NFS**und**CIFS/SMB**sind gängige Protokolle für die Blockfreigabe.

**Dateifreigabe**hingegen ermöglicht den Zugriff auf einzelne Dateien und Ordner.

**AFP**,**WebDAV**und**SFTP**sind Protokolle, die für die Dateifreigabe mit verschiedenen Clients verwendet werden können.

**Vorteile der Verwendung von FreeNAS, TrueNAS und OpenZFS für die Freigabe von Daten:**-**Flexibilität:**Verschiedene Protokolle ermöglichen die Freigabe von Daten für verschiedene Clients.
 -**Leistung:**Die Systeme bieten eine hohe Performance beim Zugriff auf freigegebene Daten.
 -**Sicherheit:**Verschiedene Sicherheitsfunktionen schützen Ihre Daten.
 -**Skalierbarkeit:**Die Speicherkapazität kann einfach erweitert werden.
## Performance
TrueNAS hebt sich durch sein leistungsstarkes Dateisystem von der Konkurrenz ab. Read- und Write-Caches ermöglichen es, die Performance eines Festplattenpools deutlich zu steigern. SSD und NVMe-Speicher werden von TrueNAS optimal unterstützt und sorgen für exzellente Lese- und Schreibgeschwindigkeiten.

**ZFS**, das underlying Dateisystem, ist auf die neuesten Technologien vorbereitet und bietet somit eine zukunftssichere Lösung mit herausragender Performance und erweiterbarer Speicherkapazität.
## Hochverfügbarkeit
TrueNAS Enterprise bietet eine innovative Lösung für die Hochverfügbarkeit Ihrer Daten. Mit einem Cluster aus zwei Controllern ist Ihr System gegen Ausfälle abgesichert und bietet maximale Verfügbarkeit. Die Hochverfügbarkeitslösung mit redundanten Controllern und intelligenter Cluster-Software garantiert kontinuierlichen Zugriff und maximale Performance.
 ##
 Datensicherheit
ZFS wurde von Grund auf mit dem Fokus auf Datenintegrität entwickelt. Durch die Verwendung von RAID-Z bietet es einen ähnlichen Schutz wie RAID 5, jedoch ohne die bekannten Probleme wie die "Schreiblücke". Diese Schwachstelle wird dank der fortschrittlichen Copy-on-Write-Architektur von ZFS vermieden. Darüber hinaus bieten die zusätzlichen Level RAID-Z2 und RAID-Z3 sogar einen doppelten bzw. dreifachen Paritätsschutz. TrueNAS bietet außerdem die Möglichkeit zur Spiegelung über Software. Alle diese Funktionen können bequem über die Weboberfläche eingesehen und konfiguriert werden.
Das ZFS-Dateisystem nutzt Prüfsummen, um die Datenintegrität zu gewährleisten, und ist eines der wenigen Dateisysteme, die auch inkonsistente Datenblöcke identifizieren können. Falls Inkonsistenzen auftreten, können Paritätsblöcke verwendet werden, um beschädigte Daten zu reparieren. Darüber hinaus ist das System standardmäßig so konfiguriert, dass es regelmäßig Datenscans durchführt.
## ZFS-Snapshots
Administratoren haben die Möglichkeit, jederzeit Snapshots des gesamten Dateisystems zu erstellen, zu speichern und zu planen. Diese Snapshots können entweder einmalig oder in regelmäßigen Abständen erstellt werden. Auf Wunsch des Nutzers kann das gesamte Dateisystem auf einen früheren Snapshot zurückgesetzt werden, und es ist auch möglich, einzelne Dateien aus Snapshots wiederherzustellen.
Des Weiteren ermöglichen Klone von älteren Snapshots dem Anwender, Daten aus früheren Versionen des Dateisystems wiederherzustellen. In der Weboberfläche können Administratoren den Speicherplatz sehen, den ein bestimmter Snapshot auf dem Volume belegt. Außerdem haben sie die Möglichkeit, einzelne Snapshots bei Bedarf zu löschen, zu klonen oder zurückzusetzen.
Die Replikation von ZFS-Snapshots bietet nicht nur lokale Backups, sondern ermöglicht auch die Erstellung von Remote-Backups. Durch die Replikation von Snapshots des Dateisystems auf ein entferntes ZFS-Dateisystem entsteht dort ein vollständiges Duplikat. Zusätzlich fungieren weitere Snapshots desselben Dateisystems als inkrementelle Backups, wodurch sich ihre Größe auf die zwischen den Snapshots vorgenommenen Änderungen reduziert.
Im Falle einer katastrophalen Beschädigung eines lokalen ZFS-Dateisystems, wie beispielsweise einem Festplattenausfall über den Paritätsschutz hinaus oder dem unwiederbringlichen Ausfall mehrerer Festplatten, kann ein Replikat von einem Remote-System genutzt werden, um die Wiederherstellung einzuleiten.
## Verschlüsselung
TrueNAS bietet über die Weboberfläche eine einfache Möglichkeit zur Verschlüsselung von ZFS-Pools oder einzelnen Freigaben. Beim Erstellen eines Pools oder einer Freigabe kann der Benutzer die Option zur Verschlüsselung wählen, die eine AES-XTS-Verschlüsselung nach Industriestandard bietet. Zusätzlich kann eine Hardwarebeschleunigung aktiviert werden, sofern der Prozessor AES-NI-fähig ist.
Verschlüsselte Volumes können nur von OpenZFS-Systemen gelesen werden, die im Besitz des Master Keys für dieses Volume sind. Der Benutzer kann optional eine Passphrase erstellen, um sein System zusätzlich vor Verlust oder Diebstahl zu schützen.
Die Verschlüsselung schafft Vertrauen bei der Ausmusterung und dem Recycling von Festplatten, da die Laufwerke nicht mehr gelöscht werden müssen, sofern die Hauptschlüssel unkenntlich gemacht wurden. Außerdem ermöglicht sie ein verschlüsseltes Backup auch an Remote-Standorten, die nicht über den Schlüssel verfügen, um die Daten zu entschlüsseln.
## Web-Schnittstelle
Das Hauptziel von TrueNAS besteht darin, komplexe Verwaltungsaufgaben für seine Benutzer zu vereinfachen. Über die Web-Benutzeroberfläche können alle Aspekte eines TrueNAS-Systems verwaltet werden. Ein Einrichtungsassistent erleichtert die Konfiguration während der Installation oder auch später im Einrichtungsprozess. Die Erstellung von Datasets und Volumes, das Anlegen von iSCSI LUNs, das Festlegen von Berechtigungen für einzelne Freigaben oder das Einspielen von Software-Updates – all dies kann erledigt werden, ohne dass wichtige Schritte übersehen oder stille Fehler auftreten.
Alle Dienste sind anpassbar, und viele von ihnen bieten erweiterte Optionen, die über das Webinterface geändert werden können. Zusätzlich zur benutzerfreundlichen Web-Oberfläche steht Ihnen die volle Leistungsfähigkeit der FreeBSD-Shell-Umgebung sowohl über die GUI als auch über SSH zur Verfügung. Letztendlich macht TrueNAS die Bereitstellung eines NAS einfacher als je zuvor und stellt sicher, dass es keinen unnötigen Aufwand zwischen Ihnen und Ihrer gewünschten Lösung gibt.
## Interoperabilität
Durch die gemeinsame Basis der TrueNAS-Varianten können die Festplatten auf jedem System in die Pools eingebunden werden. Aus diesem Grund vertrauen Benutzer auf TrueNAS. Darüber hinaus können Snapshots zwischen den Versionen ohne Einschränkungen problemlos transportiert werden. Das bedeutet, dass ein TrueNAS Community System z.B. als Backup-Speicher für eine TrueNAS Enterprise Konfiguration verwendet werden kann. Der Benutzer erhält vollen Zugriff auf die Systemkonsole und kann jederzeit auf alle Systemfunktionen zugreifen.