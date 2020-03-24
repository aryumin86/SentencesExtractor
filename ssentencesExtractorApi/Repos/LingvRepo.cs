using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using ssentencesExtractorApi.Entities;

namespace ssentencesExtractorApi.Repos
{
    public class LingvRepo : ILingvRepo
    {
        private string _dbConnString;
        private IConfiguration _config;

        public LingvRepo(IConfiguration config){
            _config = config;
            _dbConnString = _config.GetValue<string>("dbConnectionString");
        }
        
        public IEnumerable<WordForm> GetWordForms(string wordForm){
            var result = new List<WordForm>();
            if(string.IsNullOrWhiteSpace(wordForm))
                return result;
                
            string query = @"
            select Id, NormalFormId,Raw, IsNormalForm
            from simplemorf2 where NormalFormId = (
                select NormalFormId from simplemorf2 
                where Raw = @wordForm limit 1); 
            ";

            using(var conn = new MySqlConnection(_dbConnString)){
                conn.Open();
                var command = new MySqlCommand(query, conn);
                command.Parameters.AddWithValue("@wordForm", wordForm.ToUpperInvariant());
                using(var reader = command.ExecuteReader()){
                    while(reader.Read()){
                        var wf = new WordForm(){
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MainFormId = reader.GetInt32(reader.GetOrdinal("NormalFormId")),
                            Raw = reader.GetString(reader.GetOrdinal("Raw")),
                            IsMainForm = reader.GetBoolean(reader.GetOrdinal("IsNormalForm"))
                        };
                        result.Add(wf);
                    }
                }
            }
            return result;
        }
        
        public IEnumerable<WordForm> GetWordForms(int wordFormId){
            var result = new List<WordForm>();
            string query = @"
            select Id, NormalFormId,Raw, IsNormalForm
            from simplemorf2 where NormalFormId = (
                select NormalFormId from simplemorf2 
                where Id = @wordFormId limit 1);
            ";

            using(var conn = new MySqlConnection(_dbConnString)){
                conn.Open();
                var command = new MySqlCommand(query, conn);
                command.Parameters.AddWithValue("@wordFormId", wordFormId);
                using(var reader = command.ExecuteReader()){
                    while(reader.Read()){
                        var wf = new WordForm(){
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MainFormId = reader.GetInt32(reader.GetOrdinal("NormalFormId")),
                            Raw = reader.GetString(reader.GetOrdinal("Raw")),
                            IsMainForm = reader.GetBoolean(reader.GetOrdinal("IsNormalForm"))
                        };
                        result.Add(wf);
                    }
                }
            }
            return result;
        }
        
        public WordForm GetMainForm(string wordForm){
            WordForm result = null;
            string query = @"
            select Id, NormalFormId,Raw, IsNormalForm
            from simplemorf2 where NormalFormId = (
                select NormalFormId from simplemorf2 
                where Raw = @wordForm limit 1)
            and IsNormalForm = 1
            limit 1;
            ";

            using(var conn = new MySqlConnection(_dbConnString)){
                conn.Open();
                var command = new MySqlCommand(query, conn);
                command.Parameters.AddWithValue("@wordForm", wordForm);
                using(var reader = command.ExecuteReader()){
                    while(reader.Read()){
                        result = new WordForm(){
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MainFormId = reader.GetInt32(reader.GetOrdinal("NormalFormId")),
                            Raw = reader.GetString(reader.GetOrdinal("Raw")),
                            IsMainForm = reader.GetBoolean(reader.GetOrdinal("IsNormalForm"))
                        };
                        break;
                    }
                }
            }
            return result;
        }
        
        public WordForm GetMainForm(int wordFormId){
            WordForm result = null;
            string query = @"
            select Id, NormalFormId,Raw, IsNormalForm
            from simplemorf2 where NormalFormId = (
                select NormalFormId from simplemorf2 
                where Id = @wordFormId limit 1)
            and IsNormalForm = 1
            limit 1;
            ";

            using(var conn = new MySqlConnection(_dbConnString)){
                conn.Open();
                var command = new MySqlCommand(query, conn);
                command.Parameters.AddWithValue("@wordFormId", wordFormId);
                using(var reader = command.ExecuteReader()){
                    while(reader.Read()){
                        result = new WordForm(){
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MainFormId = reader.GetInt32(reader.GetOrdinal("NormalFormId")),
                            Raw = reader.GetString(reader.GetOrdinal("Raw")),
                            IsMainForm = reader.GetBoolean(reader.GetOrdinal("IsNormalForm"))
                        };
                        break;
                    }
                }
            }
            return result;
        }
    }
}