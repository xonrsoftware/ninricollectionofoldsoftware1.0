/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных dxonrusersite
CREATE DATABASE IF NOT EXISTS `dxonrusersite` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `dxonrusersite`;

-- Дамп структуры для таблица dxonrusersite.games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namevar` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `teseraid` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `bggid` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `statusvar` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица dxonrusersite.modstocheck
CREATE TABLE IF NOT EXISTS `modstocheck` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `steamid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `containsrussian` int(11) DEFAULT NULL,
  `namevar` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptionvar` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastviewed` bigint(20) NOT NULL DEFAULT 0,
  `checkedby` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gameid` int(11) DEFAULT NULL,
  `otherlink` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `languagevar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_tabletopgame` int(11) DEFAULT NULL,
  `is_roleplaygame` int(11) DEFAULT NULL,
  `is_customgame` int(11) DEFAULT NULL,
  `is_item` int(11) DEFAULT NULL,
  `is_instrument` int(11) DEFAULT NULL,
  `is_other` int(11) DEFAULT NULL,
  `sortid` int(11) DEFAULT NULL,
  `statusvar` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23582 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица dxonrusersite.system
CREATE TABLE IF NOT EXISTS `system` (
  `namevar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`namevar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица dxonrusersite.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duserid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namevar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currentactive` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
