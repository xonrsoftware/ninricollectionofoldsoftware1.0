
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных discordxonrbot
CREATE DATABASE IF NOT EXISTS `discordxonrbot` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `discordxonrbot`;

-- Дамп структуры для таблица discordxonrbot.changedusernicknames
CREATE TABLE IF NOT EXISTS `changedusernicknames` (
  `userid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.gamehistory
CREATE TABLE IF NOT EXISTS `gamehistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `roomid` varchar(255) NOT NULL,
  `gamename` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `gamestartime` bigint(20) NOT NULL,
  `gameendtime` bigint(20) DEFAULT NULL,
  `gametype` int(11) NOT NULL,
  `finished` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.pinvitelist
CREATE TABLE IF NOT EXISTS `pinvitelist` (
  `did` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invitecode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joins` int(11) NOT NULL DEFAULT 0,
  `is_notification` int(11) NOT NULL DEFAULT 1,
  `namevar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `invitecode` (`invitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.rememberedgamenames
CREATE TABLE IF NOT EXISTS `rememberedgamenames` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8 NOT NULL,
  `timestampexp` bigint(20) NOT NULL,
  `gamename` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roomid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `messageid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `messageserverid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `roomtype` int(11) NOT NULL DEFAULT 0,
  `rage` int(11) NOT NULL DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10455 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.roleplay_masters
CREATE TABLE IF NOT EXISTS `roleplay_masters` (
  `did` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isnotified` int(1) NOT NULL DEFAULT 0,
  `channelid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastplay` bigint(20) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  UNIQUE KEY `did` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп структуры для таблица discordxonrbot.roomslist
CREATE TABLE IF NOT EXISTS `roomslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channelid` varchar(255) NOT NULL,
  `groupid` enum('COMMONROOMS','RPGROOMS','COOPROOMS','') NOT NULL,
  `textchannelid` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы discordxonrbot.roomslist: ~41 rows (приблизительно)
/*!40000 ALTER TABLE `roomslist` DISABLE KEYS */;
INSERT IGNORE INTO `roomslist` (`id`, `channelid`, `groupid`, `textchannelid`, `status`) VALUES
	(1, '579696548422615085', 'COMMONROOMS', '555306553641795585', 0),
	(2, '580235579342585856', 'COMMONROOMS', '546492166562775040', 0),
	(3, '555816618333306930', 'COMMONROOMS', '555818203498938388', 0),
	(4, '572721478324453386', 'COMMONROOMS', '546498456806752267', 0),
	(5, '547370703830384690', 'COMMONROOMS', '476078564056236040', 0),
	(6, '579712876323930142', 'COMMONROOMS', '569924859195555856', 0),
	(7, '569924822239543326', 'COMMONROOMS', '569924864065011716', 0),
	(8, '554007621993103400', 'COMMONROOMS', '475773577929687080', 0),
	(9, '559797612073582622', 'COMMONROOMS', '488426079363661825', 0),
	(10, '475043196632694835', 'COMMONROOMS', '475773620086374400', 0),
	(11, '475043198054694922', 'COMMONROOMS', '475773633344831508', 0),
	(12, '475043199233032222', 'COMMONROOMS', '475773645365706782', 0),
	(13, '475043200588054528', 'COMMONROOMS', '475773659076755477', 0),
	(14, '475043222750756875', 'COMMONROOMS', '475773670154043392', 0),
	(15, '475043224273158156', 'COMMONROOMS', '475773682673778710', 0),
	(16, '475043246796701707', 'COMMONROOMS', '475773695386714123', 0),
	(17, '475043248545595402', 'COMMONROOMS', '475773710121304084', 0),
	(18, '475043270486130698', 'COMMONROOMS', '475773725438902283', 0),
	(19, '475043271819657266', 'COMMONROOMS', '476082104594333706', 0),
	(20, '475043295492309022', 'COMMONROOMS', '476082122285645837', 0),
	(22, '565439868285616138', 'COOPROOMS', '518307947965579264', 0),
	(23, '554298998148694017', 'COOPROOMS', '480463316184203274', 0),
	(24, '475309379453845514', 'COOPROOMS', '475192691781795851', 0),
	(25, '475310046989778945', 'COOPROOMS', '475192706247688203', 0),
	(26, '565437633187151872', 'RPGROOMS', '480463676818718720', 0),
	(27, '475043521917747212', 'RPGROOMS', '480463651942170644', 0),
	(28, '475043545049202688', 'RPGROOMS', '480463628596674560', 0),
	(29, '475043567115698186', 'RPGROOMS', '480463606463594496', 0),
	(30, '477258484648247306', 'RPGROOMS', '488488210104582144', 0),
	(31, '477251108213882890', 'RPGROOMS', '488520820650541057', 0),
	(32, '475309382297583623', 'COOPROOMS', '488487891971080202', 0),
	(33, '475309383358873622', 'COOPROOMS', '475192732550168578', 0),
	(34, '475043612552593438', 'RPGROOMS', '480463526549389343', 0),
	(35, '475043634689998851', 'RPGROOMS', '475189908814692362', 0),
	(36, '477259820748242954', 'COOPROOMS', '475192752943136788', 0),
	(37, '475309385896296469', 'COOPROOMS', '475192781673988096', 0),
	(38, '475043636418183169', 'RPGROOMS', '475189927353516042', 0),
	(39, '493507266054455316', 'RPGROOMS', '493511490515763220', 0),
	(40, '475309387335073825', 'COOPROOMS', '475192801810841600', 0),
	(41, '493511300354146307', 'COOPROOMS', '493511390091411457', 0);
/*!40000 ALTER TABLE `roomslist` ENABLE KEYS */;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.serverusers
CREATE TABLE IF NOT EXISTS `serverusers` (
  `did` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_partner` int(11) NOT NULL DEFAULT 0,
  `state` int(1) NOT NULL DEFAULT 1,
  `jointime` bigint(20) DEFAULT NULL,
  `leavetime` bigint(20) DEFAULT NULL,
  `invitecode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inviteuser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blockedroomusers` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `steamID64` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  UNIQUE KEY `did` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.system
CREATE TABLE IF NOT EXISTS `system` (
  `namevar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`namevar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.ttsmodsbase
CREATE TABLE IF NOT EXISTS `ttsmodsbase` (
  `steamid` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbext` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` int(1) DEFAULT 0,
  `temp_is_deleted` int(1) DEFAULT 0,
  `lastupdate` bigint(88) DEFAULT NULL,
  `steam_lastupdate` bigint(88) DEFAULT NULL,
  `messageid` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `steamid` (`steamid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица discordxonrbot.waitingforhosttotake
CREATE TABLE IF NOT EXISTS `waitingforhosttotake` (
  `chid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `messageid` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
