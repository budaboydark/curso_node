# SContabil
Sistema financeiro particular


#config mysql8:

 -> Criar usuário des:
 *
 * mysql -h 172.17.0.1 -u root -p -e "CREATE USER 'rodrigo'@'%' IDENTIFIED BY 'rodrigo'";
 *
 * -> grant all
 * mysql -h 172.17.0.1 -u root -p -e "GRANT ALL ON *.* TO 'rodrigo'@'%'"

 ALTER USER 'rodrigo'@'%' IDENTIFIED WITH mysql_native_password BY 'rodrigo';